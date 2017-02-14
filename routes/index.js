var express = require('express');
var router = express.Router();
const apiHelpers = require('../api_helpers/index_helpers');
const authHelpers = require('../auth/auth-helpers')

/* GET home page. */
router.get('/', apiHelpers.grabLocation, apiHelpers.getLocation, apiHelpers.getWeatherData, apiHelpers.getOtherLocation, function(req, res, next) {
  res.render('index', {
    title: 'atmos',
    weather: res.locals.weather,
    location: res.locals.location,
    hours: res.locals.hours,
    days: res.locals.days,
    secondaries: res.locals.secondaries,
    // otherWeather: res.locals.otherWeather
  });
});

router.get('/:location', apiHelpers.grabLocation, apiHelpers.getLocation, apiHelpers.getWeatherData, apiHelpers.getOtherLocation, function(req, res, next) {
  res.render('index', {
    title: 'atmos',
    weather: res.locals.weather,
    location: res.locals.location,
    secondaries: res.locals.secondaries,
  });
});

router.post('/', function(req, res, next) {
  res.redirect('/' + req.body.location);
});


module.exports = router;
