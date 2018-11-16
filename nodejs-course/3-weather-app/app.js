const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, geocodeResults) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeather(geocodeResults.latitude, geocodeResults.longitude,(errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Address: ${argv.address}`);
        console.log(`Temperature: ${weatherResults.temperature}`);
        console.log(`Apparent Temperature: ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
