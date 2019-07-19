'use strict';
module.exports = (sequelize, DataTypes) => {
  const appoinments = sequelize.define('appointments', {
    clientID: DataTypes.INTEGER,
    clientRoomKey: DataTypes.INTEGER,
    lawyerID: DataTypes.INTEGER,
    lawyerRoomKey: DataTypes.INTEGER
  }, {});
  appoinments.associate = function(models) {
    // associations can be defined here
  };
  return appoinments;
};
