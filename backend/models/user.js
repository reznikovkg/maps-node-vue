'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            is: /^[a-zA-Z0-9]+$/i,
        }
    },
    isActivate: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },

    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    birthday: Sequelize.DATEONLY,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
