const fs = require('fs'); //reading data from filesystem

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

fs.readFile('./txt/startt.txt', 'utf-8', (err, start) => {
  if (err) return console.log(`ERROR: ${err}`);
  fs.readFile(`./txt/${start}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      console.log(data3);

      fs.writeFile('./final.txt', `${data2}\n\n${data3}`, 'utf-8', (err) => {
        if (err) console.log(err);
        console.log('\nFile has been written!');
      });
    });
  });
});
