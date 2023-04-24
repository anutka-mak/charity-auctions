const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const Sellers = require('./sellers');
//const Products = require('./products');

const Seller = sequelize.define(
  'seller',
  {
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
  }
);
const ProductImages = sequelize.define(
  'product_images',
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },);

const Product = sequelize.define(
  'product',
  {
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
  }
);

Seller.hasMany(Product, {
  foreignKey: 'seller_id'
});
Product.belongsTo(Seller);

Product.hasMany(ProductImages, {
  foreignKey: 'product_id'
});
ProductImages.belongsTo(Product);

module.exports = {
  Seller,
  Product,
  ProductImages
};