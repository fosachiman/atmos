'use strict';
module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define('Favorites', {
    userId: DataTypes.INTEGER,
    location: DataTypes.TEXT,
    home: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Favorites;
};