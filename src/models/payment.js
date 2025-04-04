'use strict';
const {Model} = require('sequelize');
const simulation = require('./simulation');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    
    static associate(models) {
      //um pagamento pertence a uma simulação
      Payment.belongsTo(models.Simulation, {
        foreignKey: 'simulationId', 
        as: 'simulation'});
    }
  }
  Payment.init({
    simulationId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: 'Simulations',
        key: 'id',
      },
    },
    valorPago: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false, 
    },
    dataPagamento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pago', 'pendente', 'cancelado'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['pago', 'pendente', 'cancelado']],
          msg: 'Status inválido'
        }
      }
    },
    formaPagamento: {
      type: DataTypes.ENUM('pix', 'boleto', 'cartão'),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, 
  {

    sequelize,
    modelName: 'Payment',
    tableName: 'Payments',
    timestamps: true,

  });

  return Payment;
};