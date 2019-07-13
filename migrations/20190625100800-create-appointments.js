'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      clientRoomKey: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lawyerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lawyerRoomKey: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      apptAccepted: {
        type: Sequelize.BOOLEAN
      },
      apptDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('appointments');
  }
};