const axios = require("axios");
const url =
  "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";

function getJSON(){
    // To make the function blocking we manually create a Promise.
    return new Promise( function(resolve) {
        axios.get(url)
            .then(json => {
                // The data from the request is available in a .then block
                // We return the result using resolve.
                resolve(json);
            });
    });

}

// call the function
getJSON().then( function(response) {
    console.log(
      `City: ${response.data.results[0].formatted_address} -`,
      `Latitude: ${response.data.results[0].geometry.location.lat} -`,
      `Longitude: ${response.data.results[0].geometry.location.lng}`
    );
});

/*
// Async/Await approach: available in ES7

// The async keyword will automatically create a new Promise and return it.
async function getJSONAsync(){
    // The await keyword saves us from having to write a .then() block.
    let json = await axios.get(url);
    // The result of the GET request is available in the json variable.
    // We return it just like in a regular synchronous function.
    return json;
}
*/