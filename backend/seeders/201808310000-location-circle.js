'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('LocationCircles', [
          {
              name: 'africa',
              radius: '3246340',
              lat: '10',
              lng: '10',
              createdAt: '1996-05-23',
              updatedAt: '1996-05-23',
          },
          {
              name: 'russia',
              radius: '3630970',
              lat: '49.0703',
              lng: '92.5426',
              createdAt: '1996-05-23',
              updatedAt: '1996-05-23',
          },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('LocationCircles', null, {});
  }
};
