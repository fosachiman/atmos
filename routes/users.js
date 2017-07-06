var express = require('express');
var router = express.Router();
const apiHelpers = require('../api_helpers/index_helpers');
const authHelpers = require('../auth/auth-helpers');

//gets location typed into the search bar for a logged in user
router.get('/:id/location/:location', authHelpers.loginRequired, apiHelpers.grabLocation, apiHelpers.otherLocations, apiHelpers.getLocation, apiHelpers.getWeatherData, function(req, res, next) {
  res.render('user', {
    user: req.user.dataValues,
    title: 'atmos',
    weather: res.locals.weather,
    location: res.locals.location,
    hours: res.locals.hours,
    days: res.locals.days,
    secondaries: res.locals.otherLocations,
  });
});

router.get('/:id/geo/:coordinates', authHelpers.loginRequired, apiHelpers.parseGeoData, apiHelpers.revGeoCode, apiHelpers.otherLocations, apiHelpers.getWeatherData, function(req, res, next) {
  res.render('index', {
    user: req.user.dataValues,
    title: 'atmos',
    weather: res.locals.weather,
    location: res.locals.location,
    hours: res.locals.hours,
    days: res.locals.days,
    secondaries: res.locals.otherLocations,
  });
})

//GETs user page and requires a logged in user
router.get('/:id', authHelpers.loginRequired, apiHelpers.grabLocation, apiHelpers.otherLocations, apiHelpers.getLocation, apiHelpers.getWeatherData, (req, res, next) => {
  res.render('user', {
    user: req.user.dataValues,
    title: 'atmos',
    weather: res.locals.weather,
    location: res.locals.location,
    hours: res.locals.hours,
    days: res.locals.days,
    secondaries: res.locals.otherLocations,
  });
});

router.post('/:id/', function(req, res, next) {
  res.redirect('/users/' + req.params.id + '/location/' + req.body.location);
});

module.exports = router;
