"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert( "incidents", [
        {
          type: "Immigration",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Aggravated Assault",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Aiding and abetting / Accessory",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("incidents", null, {});
  }
};
