const bcrypt = require('bcryptjs');

const models = require('../db/models/index');


//compares encrypted password on server to user inputted password

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
