'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('appointments', [
      {
        clientID: 1,
        clientRoomKey: 393314,
        lawyerID: 4,
        lawyerRoomKey: 163691,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientID: 2,
        clientRoomKey: 832218,
        lawyerID: 4,
        lawyerRoomKey: 163691,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientID: 3,
        clientRoomKey: 832219,
        lawyerID: 4,
        lawyerRoomKey: 163691,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('appointments', null, {});
  }
};
