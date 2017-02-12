const axios = require('axios');
var moment = require('moment');
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

function grabLocation(req, res, next) {
  if (req.params.location)
    res.locals.location = req.params.location;
  else
    res.locals.location = 'New York, NY';
  next();
}

//on page load, we will grab the latitude and longitude of NYC to pass to dark skies api
function getLocation(req, res, next) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${res.locals.location}&key=${process.env.GEO_KEY}`)
  .then(function(response) {
    console.log(response.data.results[0].formatted_address);
    res.locals.lat = response.data.results[0].geometry.location.lat;
    res.locals.lng = response.data.results[0].geometry.location.lng;
    res.locals.location = response.data.results[0].formatted_address;
    next();
  })
}

//https://api.darksky.net/forecast/[key]/[latitude],[longitude]

function getWeatherData(req, res, next) {
  // axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${res.locals.lat},${res.locals.lng}`)
  // .then(function(response) {
  //   // console.log(response.data.currently);
  //   // console.log(moment(response.data.currently.time).format('ddd, MMM, h'))
  //   res.locals.weather = response.data;
    next();
  // })
}

module.exports = {
  getLocation,
  getWeatherData,
  grabLocation
}
