const request = require("request");

const geocode = (address, callback) => {
  const geoUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoiam1vbnRveWEyOCIsImEiOiJja3A5ZDBwOWgwZTBzMnBvZnRsM3hnMmh1In0.43hZ33dv1Imh5CgXYulHtA";

  request({ url: geoUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to find location", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another research", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};
// geocode("Boston", (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });
module.exports = geocode;
