'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
          {
              username: 'admin',
              email: 'admin@ru.ru',
              password: '123',
              token: '123',
              isActivate: 1,
              isAdmin: 1,
              birthday: '1997-05-23',
              createdAt: '1996-05-23',
              updatedAt: '1996-05-23',
          },
          {
              username: 'user',
              email: 'user@ru.ru',
              password: '123',
              token: '126663',
              isActivate: 1,
              isAdmin: 0,
              birthday: '1996-05-23',
              createdAt: '1996-05-23',
              updatedAt: '1996-05-23',
          },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
