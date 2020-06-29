const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const yelp = require('yelp-fusion');
require('dotenv').config();
const apiKey = process.env.API_KEY;
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const pdf = require('html-pdf');
const cors = require('cors');
const pdfTemplate = require('./documents');
// const PDFDocument = require('pdfkit');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('public'));

app.get('/api', (req, res) => {
    const { location, cuisine, radius } = req.query;
    // console.log(location, cuisine, radius);

    const searchRequest = {
        term: cuisine,
        location: location,
        radius: radius,
        limit: 24,
        categories: 'restaurants, all'
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

app.post('/create-json', (req, res) => {
    const jsonRecords = JSON.stringify(req.body.crawl);

    fs.writeFile('server/tour.json', jsonRecords, 'utf8', function (err) {
        if (err) {
            res.send(Promise.reject());
        } else {
            console.log('successful json created')
            res.send(Promise.resolve());
        }
    })
})

app.get('/get-json', (req, res) => {
    res.sendFile(`${__dirname}/tour.json`);
})

app.post('/create-csv', (req, res) => {
    // console.log(req.body.crawl);
    const csvWriter = createCsvWriter({
        path: 'server/tour.csv',
        header: [
            {id: '_uuid', title: 'UUID'},
            {id: 'id', title: 'ID'},
            {id: 'name', title: 'NAME'},
            {id: 'image_url', title: 'IMAGE_URL'},
            {id: 'url', title: 'URL'},
            {id: 'rating', title: 'RATING'},
            {id: 'price', title: 'PRICE'},
            {id: 'location', title: 'LOCATION'},
            {id: 'display_phone', title: 'DISPLAY_PHONE'},
            {id: 'resultIndex', title: 'RESULTINDEX'},
        ]
    });

    let data = [];

    for (let i = 0; i < req.body.crawl.length; i++) {
        let current = req.body.crawl[i];
        let stop = {
            _uuid: i + 1,
            id: current.id,
            name: current.name,
            image_url: current.image_url,
            url: current.url,
            rating: current.rating,
            price: current.price,
            location: current.location.display_address,
            display_phone: current.display_phone,
            resultIndex: current.resultIndex
        }
        data.push(stop);
    }
    // console.log(data);

    csvWriter.writeRecords(data)
    .then(() => {
        res.send(Promise.resolve());
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/get-csv', (req, res) => {
    console.log('retrieving csv');
    res.sendFile(`${__dirname}/tour.csv`);
})

app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('server/tour.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

app.get('/get-pdf', (req, res) => {
    // console.log('inside pdf get request');
    res.sendFile(`${__dirname}/tour.pdf`);
});

app.listen(port, () => console.log(`app is now listening on port ${port}`));