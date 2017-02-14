var express = require('express');
var router = express.Router();
const apiHelpers = require('../api_helpers/index_helpers');
const authHelpers = require('../auth/auth-helpers');

//GETs user page and requires a logged in user
router.get('/:id', authHelpers.loginRequired, apiHelpers.grabLocation, apiHelpers.getLocation, apiHelpers.getWeatherData, apiHelpers.getOtherLocation, (req, res, next) => {
  res.render('user', {
    user: req.user.dataValues,
    title: 'atmos',
    weather: res.locals.weather,
    location: res.locals.location,
    hours: res.locals.hours,
    days: res.locals.days,
    secondaries: res.locals.secondaries,
  });
});

module.exports = router;
