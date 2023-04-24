const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('store', 'postgres', 'openpgpwd', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
