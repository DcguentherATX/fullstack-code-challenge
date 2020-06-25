const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const request = require('request');
const yelp = require('yelp-fusion');
require('dotenv').config();
const apiKey = process.env.API_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.get('/api', (req, res) => {
    const { location, cuisine } = req.query;

    const searchRequest = {
        term: cuisine,
        location: location,
        limit: 20
    };

    const client = yelp.client(apiKey);
    client.search(searchRequest)
    .then((response) => {
        res.send(response.jsonBody);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.listen(port, () => console.log(`app is now listening on port ${port}`));