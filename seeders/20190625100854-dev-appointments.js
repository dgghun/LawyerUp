'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('appointments', [{
      clientID: 1,
      lawyerID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      clientID: 2,
      lawyerID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('appointments', null, {});
  }
};
