// https://api.darksky.net/forecast/706c169cb9ae9484b6af96b3a8c4276a/37.8267,-122.4233
const request = require('request');

var getWeather = (latitude, longitude, callback) => {
  var forecastAPIKey = '706c169cb9ae9484b6af96b3a8c4276a';

  request({
    url: `https://api.darksky.net/forecast/${forecastAPIKey}/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Error fetching the forecast details');
    }
  });
};

module.exports.getWeather = getWeather;
