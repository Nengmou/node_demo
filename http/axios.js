const axios = require("axios");
const url =
  "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
axios
  .get(url)
  .then(response => {
    console.log(
      `City: ${response.data.results[0].formatted_address} -`,
      `Latitude: ${response.data.results[0].geometry.location.lat} -`,
      `Longitude: ${response.data.results[0].geometry.location.lng}`
    );
  })
  .catch(error => {
    console.log(error);
  });

  let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code. 
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout(function(){
    resolve("Success!"); // Yay! Everything went well!
  }, 250);
});

myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage);
});