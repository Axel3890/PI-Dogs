const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definimos el modelo
  sequelize.define('Temperaments', {
    id_temperament: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name_temperament: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
