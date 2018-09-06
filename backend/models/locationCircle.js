'use strict';
module.exports = (sequelize, DataTypes) => {
  const LocationCircle = sequelize.define('LocationCircles', {
    name: DataTypes.STRING,
    radius: DataTypes.FLOAT,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  }, {});
    LocationCircle.associate = function(models) {
    // associations can be defined here
  };
  return LocationCircle;
};
