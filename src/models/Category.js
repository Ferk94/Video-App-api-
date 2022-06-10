const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

 return sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  });
};