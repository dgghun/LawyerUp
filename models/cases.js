'use strict';
module.exports = (sequelize, DataTypes) => {
  const cases = sequelize.define('cases', {
      caseUUID:{
        allowNull: false,
        type: DataTypes.UUIDV4

      },
      clientUID:{
        allowNull: false,
        type:DataTypes.INTEGER
      },
      lawyerUID:{
        type:DataTypes.INTEGER
      }
  }, {});
  cases.associate = function(models) {
    // associations can be defined here
  };
  return cases;
};