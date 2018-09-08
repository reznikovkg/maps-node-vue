'use strict';
module.exports = (sequelize, DataTypes) => {
  const LocationUser = sequelize.define('LocationUsers', {
    user: DataTypes.INTEGER,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  }, {});
    LocationUser.associate = function(models) {
    // associations can be defined here
  };
  return LocationUser;
};
