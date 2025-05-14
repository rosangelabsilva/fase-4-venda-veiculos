const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('venda_veiculos', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
