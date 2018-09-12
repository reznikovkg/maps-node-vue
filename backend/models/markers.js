'use strict';
module.exports = (sequelize, DataTypes) => {
    const Marker = sequelize.define('Markers', {
        name: DataTypes.STRING,
        lat: DataTypes.FLOAT,
        lng: DataTypes.FLOAT,
    }, {});
    Marker.associate = function (models) {
        // associations can be defined here
    };
    return Marker;
};
