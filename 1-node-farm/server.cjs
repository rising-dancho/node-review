const fs = require('fs'); // reading and writing data from filesystem
const http = require('http'); // building an http server
// const url = require('url'); // creating routes

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
const PORT = 8080;
const hostName = '127.0.0.1';

const server = http.createServer((req, res) => {
  console.log(req.url);
  // routing
  const pathName = req.url;

  if (pathName === '/overview' || pathName === '/') res.end('Overview');
  if (pathName === '/products') res.end('Products');
  if (pathName === '/about') res.end('App: reviewing Node http server');
  res.writeHead(404, {
    'Content-Type': 'text/html',
    // 'Content-Type': 'application/json',
  });
  res.end('<h1>404: Page not found</h1>');
});

server.listen(PORT, hostName, () => {
  console.log(`Server is listening for requests  on port ${PORT}`);
});
