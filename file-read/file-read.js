var fs = require('fs');

function print(data) {
	var array = data.toString().split('\n'); // convert to string since data is a Buffer type
    array.map(line => console.log(line));
}

//Synchronous:
var input = fs.createReadStream('file-read/sample.txt');
function readLines(input, func) {
  input.on('data', func);
  input.on('end', function() {
    console.log("====== Finished with Synchronous call ======");
  });
}
readLines(input, print);

//Asynchronous:
// read
fs.readFile('file-read/sample.txt', function(err, data) {
    if(err) throw err;
    print(data);
    console.log("====== Finished with Asynchronous call ======");
});

// write
fs.writeFile('temp.txt', 'Hello Node.js', 'utf8', (err) => {
	// utf8 is optional here since it is the default encoding
  if (err) throw err;
  console.log('The file has been saved!');
});