var express = require('express');
var router = express.Router();
const apiHelpers = require('../api_helpers/index_helpers');
const authHelpers = require('../auth/auth-helpers')

//gets homepage
router.get('/', authHelpers.loginRedirect, apiHelpers.grabLocation, apiHelpers.otherLocations, apiHelpers.getLocation, apiHelpers.getWeatherData, function(req, res, next) {
  res.render('index', {
    title: 'atmos',
    weather: res.locals.weather,
    location: res.locals.location,
    hours: res.locals.hours,
    days: res.locals.days,
    secondaries: res.locals.otherLocations,
  });
});

// router.get('/geo/:coordinates', )

//gets location when a user submits a location from the search bar
router.get('/:location', apiHelpers.grabLocation, apiHelpers.otherLocations, apiHelpers.getLocation, apiHelpers.getWeatherData, function(req, res, next) {
  res.render('index', {
    title: 'atmos',
    weather: res.locals.weather,
    location: res.locals.location,
    hours: res.locals.hours,
    days: res.locals.days,
    secondaries: res.locals.otherLocations,
  });
});

router.post('/', function(req, res, next) {
  res.redirect('/' + req.body.location);
});

module.exports = router;
