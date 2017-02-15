const bcrypt = require('bcryptjs');
const models = require('../db/models/index');


//compares encrypted password on server to user inputted password
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

//redirects user to user page if they're already logged in
function loginRedirect(req, res, next) {
  if (req.user) res.redirect('/users/' + req.user.id);
  return next();
}

//creates user in the database, helper function from register route
function createUser(req, res, next) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return models.User.create({
    password: hash,
    name: req.body.name,
    email: req.body.email,
  })
  .then((user) => {
    console.log(user)
    res.locals.id = user.dataValues.id;
    req.login(user, (err) => {
      if (err) return next(err);
    });
  next();
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
}

function createFavorites(req, res, next) {
  console.log(req);
   req.body.location.forEach((location) => {
   models.Favorites.create({
      userId: res.locals.id,
      location: location
    });
  });
  next();
}

//requires login on page visit
function loginRequired(req, res, next) {
  if (!req.user) res.redirect('/auth/login');

  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser,
  createFavorites
}
