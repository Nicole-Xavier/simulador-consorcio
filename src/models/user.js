'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      
      User.hasMany(models.Simulation, 
        { 
          foreignKey: 'userId', 
          as: 'simulations' 
        });
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
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true // Campo opcional
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true // Campo opcional
    },
    tipoUsuario: {
      type: DataTypes.ENUM('admin', 'cliente'),
      allowNull: false,
      defaultValue: 'cliente'
    },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo', 'suspenso'),
      allowNull: false,
      defaultValue: 'ativo'
    }
  }, 
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    hooks: { //criptografar a senha antes de salvar no banco
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(user.senha, salt);
      }
    }
  });

  return User;
};