const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const forecastUrl =
    "http://api.weatherstack.com/current?access_key=6aa0e398c4cd3bf8f7e1a29d7469cc82&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url: forecastUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect on weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is ${response.body.current.weather_descriptions}. And the temperature is ${response.body.current.temperature} degrees`
      );
    }
  });
};

// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });

module.exports = forecast;
