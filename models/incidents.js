'use strict';

module.exports = (sequelize, DataTypes) => {
  const incident = sequelize.define('incidents', {
    type: {type: DataTypes.STRING, allowNull: false}

  }, {});
  incident.associate = function(models) {
    // associations can be defined here
  };
  return incident;
};