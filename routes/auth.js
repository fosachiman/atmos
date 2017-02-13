const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');


//sends user to register page, unless they're already logged in
router.get('/register', authHelpers.loginRedirect, (req, res)=> {
  res.render('register', {
    title: 'atmos'
  });
});

//sends registration data to the db and redirects to user page
router.post('/register', (req, res, next)  => {
  authHelpers.createUser(req, res)
  .then((user) => {
    req.login(user, (err) => {
      if (err) return next(err);

      res.redirect('/auth/login');
    });
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});

//sends user to the login page
router.get('/login', authHelpers.loginRedirect, (req, res)=> {
  res.render('login', {
    title: 'atmos'
  });
});

//redirects user based on successful or failed login from login page
router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

//logs user out and redirects
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
