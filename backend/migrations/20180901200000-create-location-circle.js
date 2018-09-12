'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('LocationCircles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            radius: {
                type: Sequelize.FLOAT
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
        return queryInterface.dropTable('LocationCircles');
    }
};
