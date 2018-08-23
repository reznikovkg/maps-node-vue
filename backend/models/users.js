'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isActivate: DataTypes.BOOLEAN,
    isAdmin:  DataTypes.BOOLEAN,
    birthday: DataTypes.DATEONLY,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
