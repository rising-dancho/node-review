import fs from 'fs'; // reading and writing data from filesystem
import http from 'http'; // building an http server
import url from 'url'; // for getting paths and query options
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';


// Load environment variables from .env file
dotenv.config();
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           FILES                               //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

// BLOCKING, Synchronous

// // Displaying text input from file
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// // Get the current timestamp
// const timestamp = Date.now();
// // Convert the timestamp to a Date object
// const date = new Date(timestamp);
// // Optionally, format the date to a readable string
// const readableDate = date.toLocaleString();

// // Writing texts on a file
// const textOutput = `This is what we know about the avocado: "${textInput}". - Created on: ${readableDate}`;
// fs.writeFileSync('output.txt', textOutput);
// console.log(`File has been written! Contents: ${textOutput}`);

// NON-BLOCKING, Assynchronous

// fs.readFile('./txt/start.txt', 'utf-8', (err, start) => {
//   if (err) return console.log(`ERROR: ${err}`);
//   fs.readFile(`./txt/${start}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./final.txt', `${data2}\n\n${data3}`, 'utf-8', (err) => {
//         if (err) console.log(err);
//         console.log('\nFile has been written!');
//       });
//     });
//   });
// });

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                           SERVER                              //
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
const PORT = process.env.PORT || 8080;
const hostName = '0.0.0.0';

function replaceTemplate(template, productObj) {
  let output = template.replace(/{%PRODUCT_NAME%}/g, productObj.productName);
  output = output.replace(/{%IMAGE%}/g, productObj.image);
  output = output.replace(/{%FROM%}/g, productObj.from);
  output = output.replace(/{%NUTRIENTS%}/g, productObj.nutrients);
  output = output.replace(/{%QUANTITY%}/g, productObj.quantity);
  output = output.replace(/{%PRICE%}/g, productObj.price);
  output = output.replace(/{%ORGANIC%}/g, productObj.organic);
  output = output.replace(/{%DESCRIPTION%}/g, productObj.description);
  output = output.replace(/{%ID%}/g, productObj.id);
  if (!productObj.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  } else {
    output = output.replace(/{%NOT_ORGANIC%}/g, '');
  }

  return output;
}

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data); // JSON.parse: parses  the json into a javascript object

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); // parsing the variables out of the url. param: true -> changes the query from "string" into an "object"

  // routing
  // Overview page
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const cardsHtml = dataObj
      .map((element) => replaceTemplate(tempCard, element))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    // console.log(cardsHtml);
    res.end(output);
  }

  // Product page
  else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    // res.end(`Product Item: ${query.id}`);
    res.end(output);
  }

  // API page
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  }

  // About page
  else if (pathname === '/about') {
    res.end('App: reviewing Node http server');
  }

  // Not found page
  else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.end('<h1>404: Page not found</h1>');
  }
});

server.listen(PORT, hostName, () => {
  console.log(`Server is listening for requests  on port ${PORT}`);
});
