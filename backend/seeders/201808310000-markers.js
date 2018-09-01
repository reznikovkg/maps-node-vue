'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Markers', [
          {
              name: 'admin',
              address: 'admin@ru.ru',
              lat: '123',
              lng: '123',
              createdAt: '1996-05-23',
              updatedAt: '1996-05-23',
          },
          {
              name: 'admin',
              address: 'admin@ru.ru',
              lat: '1233',
              lng: '1222',
              createdAt: '1996-05-23',
              updatedAt: '1996-05-23',
          },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Markers', null, {});
  }
};
