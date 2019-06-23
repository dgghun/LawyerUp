'use strict';
module.exports = (sequelize, DataTypes) => {
  const lawyerLegalProfile = sequelize.define('lawyerLegalProfiles', {
    userID: DataTypes.INTEGER,
    fieldID: DataTypes.INTEGER,
  }, {});
  lawyerLegalProfile.associate = function(models) {
    // associations can be defined here
  };
  return lawyerLegalProfile;
};