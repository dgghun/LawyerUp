'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('lawyerLegalProfiles', [
      {
        userID: 3,
        fieldID: 51,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 3,
        fieldID: 54,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 3,
        fieldID: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 4,
        fieldID: 51,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 4,
        fieldID: 54,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 5,
        fieldID: 51,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 5,
        fieldID: 55,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 6,
        fieldID: 51,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 6,
        fieldID: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 7,
        fieldID: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userID: 8,
        fieldID: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('lawyerLegalProfiles', null, {});
  }
};
