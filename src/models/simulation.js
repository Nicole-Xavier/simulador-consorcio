'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Simulation extends Model {
    
    static associate(models) {
      Simulation.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      Simulation.belongsTo(models.Consortium, {
        foreignKey: 'consortiumId',
        as: 'consortium'
      });
    }
  }
  Simulation.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    consortiumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Consortiums',
        key: 'id',
      }
    },
    parcelaMensal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    }, 
  },
  {
    sequelize,
    modelName: 'Simulation',
    tableName: 'Simulations',
    timestamps: true,
  });
  
  return Simulation;
};