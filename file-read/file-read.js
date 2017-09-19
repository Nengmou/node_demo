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
fs.readFile('file-read/sample.txt', function(err, data) {
    if(err) throw err;
    print(data);
    console.log("====== Finished with Asynchronous call ======");
});