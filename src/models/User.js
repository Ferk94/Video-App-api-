const { DataTypes } = require('sequelize');
const  Role  = require('../enums/enums');



module.exports = (sequelize) => {

 return sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      values: Object.values(Role),
      defaultValue: Role.USER
    }
  });
};