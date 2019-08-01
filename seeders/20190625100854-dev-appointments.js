'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('appointments', [{
      clientID: 1,
      clientRoomKey: 393314,
      lawyerID: 4,
      lawyerRoomKey: 163691,
      caseUUID: "babcb7c8-9607-462f-8536-3b6b16b7b99b",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('appointments', null, {});
  }
};
