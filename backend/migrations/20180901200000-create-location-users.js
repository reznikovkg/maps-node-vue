'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('LocationUsers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: Sequelize.INTEGER
            },
            user: {
                type: Sequelize.INTEGER
            },
            lat: {
                type: Sequelize.FLOAT
            },
            lng: {
                type: Sequelize.FLOAT
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('LocationUsers');
    }
};
