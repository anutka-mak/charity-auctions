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
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mainPhoto: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {timestamps: false}
    );

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
    productCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
    },
    beginning: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  },
    {timestamps: false,
      paranoid: true,}
);

    
const ProjectCategory = sequelize.define(
  'project_categories',
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
  }
);
const Bids = sequelize.define(
  'bids',
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
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },    
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },  
  }, {timestamps: false}
);

Seller.hasMany(Product, {
  foreignKey: 'sellerId'
});
Product.belongsTo(Seller);

Product.hasMany(ProductImages, {
  foreignKey: 'productId'
});
ProductImages.belongsTo(Product);

ProjectCategory.hasMany(Product, {
  foreignKey: 'projectCategoryId'
});
Product.belongsTo(ProjectCategory);

Product.hasMany(Bids, {
  foreignKey: 'productId'
});
Bids.belongsTo(Product);

module.exports = {
  Seller,
  Product,
  ProductImages,
  ProjectCategory,
  Bids
};

