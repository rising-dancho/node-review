import fs from 'fs';


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //
//                     READ AND WRITE FILES                      `//
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

const text = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(text);

// // Get the current timestamp
const timestamp = Date.now();
// // Convert the timestamp to a Date object
const date = new Date(timestamp);
// // Optionally, format the date to a readable string
const readableDate = date.toLocaleString();

const output = `Output: ${text}. \n Created on ${readableDate} `;
fs.writeFileSync('./output/output.txt', output);
console.log('File written successfully!');
