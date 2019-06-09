'use strict';
module.exports = (sequelize, DataTypes) => {
  const client_tbl = sequelize.define('client_tbl', {
    firstName: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNum: DataTypes.STRING,
    country: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  client_tbl.associate = function(models) {
    // associations can be defined here
  };
  return client_tbl;
};