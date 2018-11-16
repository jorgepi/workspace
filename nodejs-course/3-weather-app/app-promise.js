const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      desbribe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodingKey = 'gocOIMMyVrvVvnP7zPlBdlT2GBg37dAS';
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${geocodingKey}&location=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
  if (response.data.info.statuscode !== 0) {
    throw new Error('Unable to find that address');
  }
  var lat = response.data.results[0].locations[0].latLng.lat;
  var lng = response.data.results[0].locations[0].latLng.lng;
  var forecastAPIKey = '706c169cb9ae9484b6af96b3a8c4276a';
  var weatherUrl = `https://api.darksky.net/forecast/${forecastAPIKey}/${lat},${lng}`
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature} and it feels like ${apparentTemperature}`)
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers')
  } else {
    console.log(e.message);
  }
});
