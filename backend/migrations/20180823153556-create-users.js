'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      username: {
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      token: {
        unique: true,
        type: Sequelize.STRING
      },
      isActivate: {
        type: Sequelize.BOOLEAN
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      birthday: {
        type: Sequelize.DATEONLY
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
