'use strict';
module.exports = (sequelize, DataTypes) => {
  const appoinments = sequelize.define('appointments', {
    clientID: DataTypes.INTEGER,
    lawyerID: DataTypes.INTEGER
  }, {});
  appoinments.associate = function(models) {
    // associations can be defined here
  };
  return appoinments;
};