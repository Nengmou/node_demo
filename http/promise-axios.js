const fs = require('fs');
const axios = require("axios");
const get = require("lodash/get");
const url = "https://maps.googleapis.com/maps/api/geocode/json?address=";

function getJSON(city){
    // To make the function blocking we manually create a Promise.
    return new Promise(function(resolve) {
        axios.get(url+city)
        .then(json => {
                // The data from the request is available in a .then block
                // We return the result using resolve.
                resolve(json);
            }).catch(ex => {
              console.log(ex);
          });
        });
}

/*
// Async/Await approach: available in ES7+

// The async keyword will automatically create a new Promise and return it.
async function getJSONAsync(){
    // The await keyword saves us from having to write a .then() block.
    let json = await axios.get(url);
    // The result of the GET request is available in the json variable.
    // We return it just like in a regular synchronous function.
    return json;
}
*/

// help function to process result
function printCityInfo(response) {
    // console.log(
    //   `City: ${response.data.results[0].formatted_address} -`,
    //   `Latitude: ${response.data.results[0].geometry.location.lat} -`,
    //   `Longitude: ${response.data.results[0].geometry.location.lng}`
    // );
const city = get(response, "data.results[0].formatted_address", "not found");
const latitude = get(response, "data.results[0].geometry.location.lat");
const longitude = get(response, "data.results[0].geometry.location.lng");

console.log(
  `City: ${city} -`,
  `Latitude: ${latitude} -`,
  `Longitude: ${longitude}`
  );
}

// single call with promise
getJSON("Xianning").then(printCityInfo);

// multiple calls with Promiss.all()
fs.readFile('http/city-names.txt', 'utf8', function(err, response) {
    if(err) throw err;
    // this function use utf8 encoding.
    // a raw buffer is returned if not specified, and the below line is needed then
    // const data = response.toString(); //convert buffer response to String
    let arr = response.split('\n'); //split to lines
    arr = arr.filter(line => line.length > 0); //remove empty line
    const promises = arr.map(getJSON);
    Promise.all(promises)
    .then(values => {
      values.map(printCityInfo);
  }).catch(ex => {
      console.log(ex);
  });
});
