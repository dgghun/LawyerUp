'use strict';
module.exports = (sequelize, DataTypes) => {
  const legalIncidentMap = sequelize.define('legalIncidentMaps', {
    fieldID: DataTypes.INTEGER,
    incidentID: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {});
  legalIncidentMap.associate = function(models) {
    // associations can be defined here
  };
  return legalIncidentMap;
};