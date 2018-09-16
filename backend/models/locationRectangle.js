'use strict';
module.exports = (sequelize, DataTypes) => {
    const LocationRectangle = sequelize.define('LocationRectangles', {
        name: DataTypes.STRING,
        south: DataTypes.FLOAT,
        west: DataTypes.FLOAT,
        north: DataTypes.FLOAT,
        east: DataTypes.FLOAT,
    }, {});
    LocationRectangle.associate = function (models) {
        // associations can be defined here
    };
    return LocationRectangle;
};
