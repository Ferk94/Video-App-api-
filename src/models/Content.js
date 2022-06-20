const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

 return sequelize.define('Content', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster: {
        type: DataTypes.STRING(16000),
        allowNull: false
    },
    released: {
        type: DataTypes.STRING,
        allowNull: false
      },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plot: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    actors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};