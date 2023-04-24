const path = require('path');
//const { Op } = require('sequelize');
//const { Sequelize } = require('sequelize');
var express = require('express');
//const ProjectCategory = require('../models/projectCategory');
//const ProductImages = require('../models/productImages');
const { Product, Seller, ProductImages } = require('../models/sellersProducts');
const SellersProducts = require('../models/sellersProducts');
var router = express.Router();
//const url = require('url');
//const Products = require('../models/products');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});
/*router.get('/categories', async (req, res) => {
  const categories = await ProjectCategory.findAll({
    attributes: ['name'],
  });
  res.json({ categories });
});*/

//Фото на сторінку "Більше"
router.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '../images', filename);
  res.sendFile(imagePath);
});

router.get('/:path', async (req, res) => {
  const { path } = req.params;
  const imagePath = `${__dirname}/../${path}`;
  res.sendFile(imagePath);
});

router.get('/imagess', async (req, res) => {
  const { main_photo } = req.query;
  let images;
  if (main_photo === 'true') {
    images = await Product.findAll({
      where: { main_photo: true, product_id: 1 },
      attributes: ['path'],
    });
  } 
  if (main_photo === 'false') {
    images = await Product.findAll({
      where: { product_id: 1},
      attributes: ['path'],
    });
  }
  res.json(images);
});
/*
router.get('/profile', (req, res) => {
  const username = req.query.username;
  // max
  const country = req.query.country;
  // usa
  console.log(username, country);
  res.send('Profile page');
});
/*const productImages = await ProductImages.findAll({
  where: { product_id: { [Op.in]: products.map(p => p.id) } },
  attributes: ['path', 'product_id'],
});
const sellers = await Sellers.findAll({
  where: { id: { [Op.in]: products.map(p => p.seller_id) } },
  attributes: ['name', 'contact_info'],
});
*/

/*  Москалевбивчий мотлох*/

/*router.get('/moskalevbyvchyy-motlokh/products', async (req, res) => {
  const products = await Products.findAll({
    where: { product_category_id: 2 },
    attributes: ['id', 'name', 'description', 'price'],
  });

  res.json(products);
});

router.get('/moskalevbyvchyy-motlokh/ProductImages', async (req, res) => {
  const products = await Products.findAll({
    where: { product_category_id: 2 },
    attributes: ['id', 'name', 'description', 'price'],
  });

  const productIds = products.map(p => p.id);

  const productImages = await ProductImages.findAll({
    where: { product_id: { [Op.in]: productIds } },
    attributes: ['path', 'product_id'],
  });

  res.json(productImages);
});

router.get('/moskalevbyvchyy-motlokh/sellers', async (req, res) => {
  const products = await Products.findAll({
    where: { product_category_id: 2 },
    attributes: ['id', 'seller_id'],
  });

  const sellerIds = products.map(p => p.seller_id);

  const sellers = await Sellers.findAll({
    where: { id: { [Op.in]: sellerIds } },
    attributes: ['id', 'name', 'contact_info'],
  });

  res.json(sellers);
});
*/

/*router.get('/moskalevbyvchyy-motlokh/', async (req, res) => {
  const { id } = req.query;
  const { main_photo } = req.query;

  let images;
  if (main_photo === 'true') {
    images = await ProductImages.findAll({
      where: { main_photo: true, product_id: id },
      attributes: ['path'],
    });
  } 
  if (main_photo === 'false') {
    images = await ProductImages.findAll({
      where: { product_id: id },
      attributes: ['path'],
    });
  }

  const product = await Products.findOne({
    where: { id },
    attributes: ['id', 'name', 'description', 'price', 'seller_id'],
  });

  const seller = await SellersProducts.findOne({
    where: { id: product.seller_id },
    attributes: ['id', 'name', 'contact_info'],
  });
  res.json({ product, images, seller });
});
*/
/*router.get('/moskalevbyvchyy-motlokh/sellers/', async (req, res) => {
  const sellers = await SellersProducts.findAll({
    attributes: ['id', 'name', 'contact_info'],
  });
  res.json(sellers);
});*/

router.get('/moskalevbyvchyy-motlokh/sellers/id:', async (req, res) => {
  const sellers = await SellersProducts.findAll({
    attributes: ['id', 'name', 'contact_info'],
  });
  res.json(sellers);
});
router.get('/moskalevbyvchyy-motlokh/all/', async (req, res) => {
  const { main_photo } = req.query;
  const { project_category_id } = req.query;
  let images;
  
  if (main_photo === 'true') {
  images = await ProductImages.findAll({
  where: { main_photo: true },
  attributes: ['path', 'product_id'],
  });
  } else if (main_photo === 'false') {
  images = await ProductImages.findAll({
  attributes: ['path', 'product_id'],
  });
  }
  
  const products = await Product.findAll({
  where: {project_category_id: 2 },
  attributes: ['id', 'name', 'description', 'price', 'seller_id'],
  });
  
  const sellers = await Seller.findAll({
  attributes: ['id', 'name', 'contact_info'],
  });
  
  res.json({ products, images, sellers });
  });

module.exports = router;