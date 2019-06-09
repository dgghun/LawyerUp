'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lawyer_tbl', [{
      firstName: 'Jane',
      lastname: 'Doe',
      email: 'dummy@email.com',
      phoneNum: '9512223456',
      country: 'USA',
      password: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lawyer_tbl', null, {});
  }
};
