const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    var geocodingKey = 'gocOIMMyVrvVvnP7zPlBdlT2GBg37dAS'

    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=${geocodingKey}&location=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to geolocation servers');
      } else if (body.info.statuscode !== 0) {
        reject('Error fetching details from the address');
      } else {
        resolve({
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    });
  });
};

geocodeAddress('EC1V8EL London').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
