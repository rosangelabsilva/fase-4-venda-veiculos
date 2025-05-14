const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Veiculo = sequelize.define('Veiculo', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  marca: DataTypes.STRING,
  modelo: DataTypes.STRING,
  ano: DataTypes.INTEGER,
  cor: DataTypes.STRING,
  preco: DataTypes.DECIMAL,
  status: {
    type: DataTypes.ENUM('disponivel', 'vendido'),
    defaultValue: 'disponivel'
  },
  dataVenda: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cpfComprador: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Veiculo;
