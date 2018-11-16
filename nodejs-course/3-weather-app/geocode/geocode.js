const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  var geocodingKey = 'gocOIMMyVrvVvnP7zPlBdlT2GBg37dAS'

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${geocodingKey}&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to geolocation servers');
    } else if (body.info.statuscode !== 0) {
      callback('Error fetching details from the address');
    } else {
      callback(undefined, {
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
