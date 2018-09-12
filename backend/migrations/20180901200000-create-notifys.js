'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Notifys', {
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
            head: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            text: {
                type: Sequelize.STRING
            },
            time: {
                type: Sequelize.TIME
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Notifys');
    }
};
