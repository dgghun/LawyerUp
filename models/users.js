'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phoneNumber: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    isLawyer: {type: DataTypes.BOOLEAN, allowNull: false},
    roomKey: {type: DataTypes.UUID, allowNull: false},
    profileImg: {type: DataTypes.STRING}
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};