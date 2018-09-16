'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('LocationRectangles', {
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
            south: {
                type: Sequelize.FLOAT
            },
            west: {
                type: Sequelize.FLOAT
            },
            north: {
                type: Sequelize.FLOAT
            },
            east: {
                type: Sequelize.FLOAT
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('LocationRectangles');
    }
};
