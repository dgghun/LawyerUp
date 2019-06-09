'use strict';
module.exports = (sequelize, DataTypes) => {
  const lawyer_tbl = sequelize.define('lawyer_tbl', {
    firstName: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNum: DataTypes.STRING,
    country: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  lawyer_tbl.associate = function(models) {
    // associations can be defined here
  };
  return lawyer_tbl;
};