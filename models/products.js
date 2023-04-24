const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const Sellers = require('./sellers');
//const ProjectCategory = require('./projectCategory');

class Products extends Model {}

Products.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'Products',
  tableName: 'products',
});

/*Products.belongsTo(ProjectCategory, {
  foreignKey: 'product_category_id' // зовнішній ключ, що посилається на первинний ключ таблиці Sellers
});
ProjectCategory.hasMany(Products);*/

module.exports = Products;
