'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('client_tbl', [{
      firstName: 'John',
      lastname: 'Doe',
      email: 'test@email.com',
      phoneNum: '9091234567',
      country: 'Mexico',
      password: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('client_tbl', null, {});
  }
};
