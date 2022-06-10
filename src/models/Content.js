const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

 return sequelize.define('Content', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    data: {
      type: DataTypes.BLOB,
      allowNull: false,
      unique: true
    },
  });
};