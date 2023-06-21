//const { Model, DataTypes } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const sequelize = require('../config/database');
const Products = require('./products');

//class ProductImages extends Model {}
const ProductImages = sequelize.define(
  'product_images',
  {
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},);
Products.belongsTo(ProductImages);
module.exports = ProductImages ;

