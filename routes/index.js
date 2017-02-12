var express = require('express');
var router = express.Router();
var apiHelpers = require('../api_helpers/index_helpers')

/* GET home page. */
router.get('/', apiHelpers.grabLocation, apiHelpers.getLocation, apiHelpers.getWeatherData, function(req, res, next) {
  res.render('index', {
    title: 'atmos',
    // weather: res.locals.weather
    location: res.locals.location
  });
});

router.get('/:location', apiHelpers.grabLocation, apiHelpers.getLocation, apiHelpers.getWeatherData, function(req, res, next) {
  res.render('index', {
    title: 'atmos',
    // weather: res.locals.weather
    location: res.locals.location
  });
});

router.post('/', function(req, res, next) {
  res.redirect('/' + req.body.location);
})

module.exports = router;
