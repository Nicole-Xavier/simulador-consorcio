'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      
      User.hasMany(models.Simulation, { foreignKey: 'userId', as: 'simulations' });
      }    
    }
  
  User.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [11, 11], // CPF deve ter exatamente 11 caracteres
      }
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 11], // Telefone pode ter 10 (fixo) ou 11 (celular) caracteres
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  });

  return User;
};