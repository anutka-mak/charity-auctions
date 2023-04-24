const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const Products = require('./products');

class Sellers extends Model {}

Sellers.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_info: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Sellers',
  tableName: 'sellers',
});

module.exports = Sellers;
