const axios = require('axios');
var moment = require('moment');
const models = require('../db/models/index');

//grabs location from search params or returns NY, NY
function grabLocation(req, res, next) {
  if (req.params.location) {
    console.log(req.params.location);
    res.locals.location = req.params.location;
  }
  else {
    res.locals.location = 'New York, NY';
  }
  next();
}

//pulls locations from logged in users from the database, or adds base locations to the sidebar for easy access
function otherLocations(req, res, next) {
  if (req.user) {
    models.Favorites.findAll({
      where: {
        userId: req.params.id
      }
    })
    .then(function(favorites) {
      res.locals.otherLocations = [];
      favorites.forEach(function(favorite) {
        res.locals.otherLocations.push(favorite.location);
      })
    })
  }
  else {
    res.locals.otherLocations = ['Birmingham, AL', 'Los Angeles, CA', 'Bangkok, Thailand', 'Sao Paolo, Brazil', 'Berlin, Germany'];
    console.log(res.locals.otherLocations);
  }
  next();
}

//on page load, we will grab the latitude and longitude of NYC to pass to dark skies api
function getLocation(req, res, next) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${res.locals.location}&key=${process.env.GEO_KEY}`)
  .then(function(response) {
    res.locals.lat = response.data.results[0].geometry.location.lat;
    res.locals.lng = response.data.results[0].geometry.location.lng;
    res.locals.location = response.data.results[0].formatted_address;
    next();
  })
  .catch(function(response) {
    console.log(response);
  })
}

//pulls weather data from lat and lng pulled from google api and makes a get request to dark skies api
function getWeatherData(req, res, next) {
  axios.get(`https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/${res.locals.lat},${res.locals.lng}`)
  .then(function(response) {
    res.locals.weather = response.data;
    //convert time for the next 8
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
  .catch(function(response) {
    console.log(response);
  })
}

function parseGeoData(req, res, next) {
  if (req.params.coordinates) {
    console.log(req.params.coordinates);
    let str = req.params.coordinates;
    let coords = str.split('--');
    res.locals.lat = coords[0];
    res.locals.lng = coords[1];
  }
  next();
}

function revGeoCode(req, res, next) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${res.locals.lat},${res.locals.lng}&key=${process.env.GEO_KEY}`)
  .then(function(response) {
    res.locals.location = response.data.results[0].formatted_address;
    next();
  })
  .catch(function(response) {
    console.log(response);
  })
}

module.exports = {
  getLocation,
  getWeatherData,
  grabLocation,
  otherLocations,
  parseGeoData,
  revGeoCode,
}
