'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consortium extends Model {
    
    static associate(models) {
      // Um consorcio com varias simulações
        Consortium.hasMany(models.Simulation, {foreignKey: 'consortiumId', as: 'simulations'});
    }
  }
  Consortium.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    prazoMeses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taxaAdministrativa: {
      type: DataTypes.DECIMAL(5,2),//Ex: 2.50%->2.50
      allowNull: false,
    },
  }, 
  {
    sequelize,
    modelName: 'Consortium',
    tableName: 'Consortiums',
    timestamps: true,
  });
  
  return Consortium;
};