const axios = require('axios');
var moment = require('moment');
const models = require('../db/models/index');

function grabLocation(req, res, next) {
  if (req.params.location)
    res.locals.location = req.params.location;
  else
    res.locals.location = 'New York, NY';
  if (req.user) {
    models.Favorites.findAll({
      where: {
        userId: req.params.id
      }
    })
    .then(function(favorites) {
      res.locals.otherLocations = [];
      favorites.forEach(function(favorite) {
        console.log('FAVORITE:' + favorite)
        res.locals.otherLocations.push(favorite.location);
      })
        console.log(favorites);
        // res.locals.otherLocations.push(dataValues.location);
    })
  }
  else
    res.locals.otherLocations = ['Birmingham, AL'];
  next();
}

//on page load, we will grab the latitude and longitude of NYC to pass to dark skies api
function getLocation(req, res, next) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${res.locals.location}&key=${process.env.GEO_KEY}`)
  .then(function(response) {
    // console.log(response.data.results[0].formatted_address);
    res.locals.lat = response.data.results[0].geometry.location.lat;
    res.locals.lng = response.data.results[0].geometry.location.lng;
    res.locals.location = response.data.results[0].formatted_address;
    next();
  })
}

function getOtherLocation(req, res, next) {
  res.locals.secondaries = [];
  res.locals.otherLocations.forEach(function(location) {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GEO_KEY}`)
    .then(function(response) {
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let formattedLocation = response.data.results[0].formatted_address;
    res.locals.secondaries.push({
      lat: lat,
      lng: lng,
      loc: formattedLocation
    })
    next();
    })
  })
}

function getWeatherData(req, res, next) {
  axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${res.locals.lat},${res.locals.lng}`)
  .then(function(response) {
    res.locals.weather = response.data;
    //convert time for the next 8 hours
    let hoursArray = [];
    for (let i = 0; i < 8; i++) {
      hoursArray.push(moment.unix(response.data.hourly.data[i].time).format('hA'));
    }
    res.locals.hours = hoursArray;
    //convert time for the next 7 days
    let daysArray = [];
    for (let i = 1; i < 8; i++) {
      daysArray.push(moment.unix(response.data.daily.data[i].time).format('ddd'));
    }
    res.locals.days = daysArray;
    next();
    })
}

// function getOtherWeatherData(req, res, next) {
//   res.locals.otherWeather = [];
//   res.locals.secondaries.forEach(function(secondary) {
//     axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${secondary.lat},${secondary.lng}`)
//     .then(function(response) {
//       res.locals.otherWeather.push({
//         weather: response.data
//       })
//       console.log(res.locals.otherWeather[0]);
//     })
//   })
//   next();
// }

module.exports = {
  getLocation,
  getWeatherData,
  grabLocation,
  getOtherLocation,
  // getOtherWeatherData
}
