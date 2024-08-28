import fs from 'fs';
import http from 'http';
import url from 'url';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080; // Use the port from the environment variable or default to 8080
const hostName = '127.0.0.1';

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
  path.join(__dirname, 'templates', 'template-overview.html'),
  'utf-8'
);
const tempProduct = fs.readFileSync(
  path.join(__dirname, 'templates', 'template-product.html'),
  'utf-8'
);
const tempCard = fs.readFileSync(
  path.join(__dirname, 'templates', 'template-card.html'),
  'utf-8'
);
const data = fs.readFileSync(
  path.join(__dirname, 'dev-data', 'data.json'),
  'utf-8'
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const cardsHtml = dataObj
      .map((element) => replaceTemplate(tempCard, element))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else if (pathname === '/about') {
    res.end('App: reviewing Node http server');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404: Page not found</h1>');
  }
});

server.listen(PORT, hostName, () => {
  console.log(`Server is listening for requests on port ${PORT}`);
});
