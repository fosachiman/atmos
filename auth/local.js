const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options = {usernameField: 'email'};

init();

//setting the local auth strategy to accept email/password
passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  models.User.findOne({
    where: {
      username: email
    }
  })
  //checks for email match
  .then((user) => {
    console.log(user);
    if (!user) {
      return done(null, false);
    }
    //checks for password match
    if (!authHelpers.comparePass(password, user.dataValues.password)) {
      return done(null, false);
    } else {
      //if both match, return user's data from database
      return done(null, user.dataValues);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;
