'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notify = sequelize.define('Notifys', {
        user: DataTypes.INTEGER,
        head: DataTypes.STRING,
        type: DataTypes.STRING,
        text: DataTypes.STRING,
        time: DataTypes.TIME,
    }, {});
    Notify.associate = function (models) {
        // associations can be defined here
    };
    return Notify;
};
