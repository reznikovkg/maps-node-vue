'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('LocationCircles', [
          {
              name: 'admin',
              radius: '1000000',
              lat: '12.3',
              lng: '12.3',
              createdAt: '1996-05-23',
              updatedAt: '1996-05-23',
          },
          {
              name: 'admin',
              radius: '1000000',
              lat: '12.33',
              lng: '12.22',
              createdAt: '1996-05-23',
              updatedAt: '1996-05-23',
          },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('LocationCircles', null, {});
  }
};
