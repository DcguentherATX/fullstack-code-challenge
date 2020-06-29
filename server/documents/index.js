module.exports = ({ crawl }) => {
const tour = crawl[0];
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
          <style>
          h1 {
            font-family: 'Cinzel Decorative', Arial, Helvetica, cursive;
          }
          body {
            font-family: 'Nunito', Arial, Helvetica, sans-serif;
            font-size: 1.25rem;
            font-weight: 400;
            margin-left: 10px;
          }
          .tour-info {
             padding-top: 5px;
          }
          </style>
       </head>
       <body>
          <div>
            <h1>${tour.location.city}</h1>
            <div>
               <img  src=${tour.image_url} style="width:100%; max-width:156px;" />
            </div>
            <div class="tour-info">Restaurant name: ${tour.name}</div>
            <div class="tour-info">City: ${tour.location.city}</div>
            <div class="tour-info">Rating: ${tour.rating}</div>
            <div class="tour-info">Price: ${tour.price}</div>
            <div class="tour-info">Number of Stops: ${crawl.length}</div>
         </div>
       </body>
    </html>
    `;
};