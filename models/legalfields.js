'use strict';

module.exports = (sequelize, DataTypes) => {
  const legalFields = sequelize.define('legalFields', {
    field: {type:DataTypes.STRING, allowNull: false}
  }, {});

  legalFields.associate = function(models) {
    // associations can be defined here
  };

  return legalFields;
};