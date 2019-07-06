"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "legalIncidentMaps",
      [
        {
          fieldID: 51,
          incidentID: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fieldID: 51,
          incidentID: 18,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fieldID: 51,
          incidentID: 29,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fieldID: 51,
          incidentID: 52,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          fieldID: 51,
          incidentID: 53,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("legalIncidentMaps", null, {});
  }
};
