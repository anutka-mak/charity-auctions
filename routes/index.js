const path = require('path');
var express = require('express');
const { Product, Seller, ProductImages, ProjectCategory, Bids} = require('../models/sellersProducts');
const SellersProducts = require('../models/sellersProducts');
var router = express.Router();
const ejs = require('ejs');
const { Op } = require('sequelize');
const fileUpload = require('express-fileupload');
const fs = require('fs');
router.use(fileUpload());
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

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
  const { mainPhoto } = req.query;
  let images;
  if (mainPhoto === 'true') {
    images = await Product.findAll({
      where: { mainPhoto: true, productId: 1 },
      attributes: ['path'],
    });
  } 
  if (mainPhoto === 'false') {
    images = await Product.findAll({
      where: { productId: 1},
      attributes: ['path'],
    });
  }
  res.json(images);
});

router.get('/moskalevbyvchyy-motlokh/sellers/id:', async (req, res) => {
  const sellers = await SellersProducts.findAll({
    attributes: ['id', 'name', 'contact_info'],
  });
  res.json(sellers);
});

  /*шкільні аукціони*/
    router.get('/shkilni-auktsiony/all/', async (req, res) => {
      const { mainPhoto } = req.query;
      const { projectCategoryId } = req.query;
      let images;
      
      if (mainPhoto === 'true') {
      images = await ProductImages.findAll({
      where: { mainPhoto: true },
      attributes: ['path', 'productId', 'mainPhoto'],
      });
      } else if (mainPhoto === 'false') {
      images = await ProductImages.findAll({
      attributes: ['path', 'productId', 'mainPhoto'],
      });
      }
    
      const products = await Product.findAll({
      where: {projectCategoryId: 1,
              deletedAt: null },
      attributes: ['id', 'name', 'description', 'price', 'sellerId', 'deadline', 'beginning'],

      });
      const bids = await Bids.findAll({
        attributes: ['name', 'contact', 'price', 'productId'],
      });
      

      if(products.price);

      const sellers = await Seller.findAll({
      attributes: ['id', 'name', 'contact_info'],
      });

      const categories = await ProjectCategory.findAll({
        attributes: ['name'],
      });
    
      res.json({ products, images, sellers, categories, bids});
      });

      router.get('/moskalevbyvchyy-motlokh/all/', async (req, res) => {
        const { mainPhoto } = req.query;
        const { projectCategoryId } = req.query;
        let images;
        
        if (mainPhoto === 'true') {
        images = await ProductImages.findAll({
        where: { mainPhoto: true },
        attributes: ['path', 'productId'],
        });
        } else if (mainPhoto === 'false') {
        images = await ProductImages.findAll({
        attributes: ['path', 'productId'],
        });
        }

        const products = await Product.findAll({
        where: {projectCategoryId: 2,
                deletedAt: null },
        attributes: ['id', 'name', 'description', 'price', 'sellerId'],
        });

        const sellers = await Seller.findAll({
        attributes: ['id', 'name', 'contact_info'],
        });

        const categories = await ProjectCategory.findAll({
          attributes: ['name'],
        });

        res.json({ products, images, sellers, categories });
        });
    
    router.get('/more-about/:id', async (req, res) => {
      const { id } = req.params;
    
      const product = await Product.findOne({
        where: { id },
        attributes: ['id', 'name', 'description', 'price', 'sellerId', 'projectCategoryId', 'deadline', 'beginning'],
      });
    
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
    
      const images = await ProductImages.findAll({
        where: { productId: id },
        attributes: ['path', 'productId', 'mainPhoto'],
      });
    
      const seller = await Seller.findOne({
        where: { id: product.sellerId },
        attributes: ['id', 'name', 'contact_info'],
      });
      const categories = await ProjectCategory.findOne({
        where: {id: product.projectCategoryId},
        attributes: ['name'],
      });
  
      function formatRemainingTime(deadline) {
        const currentTime = new Date();
        const deadlineTime = new Date(deadline);
        const timeDiff = deadlineTime - currentTime;
      
        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDiff / (1000 * 60)) % 60);
        const secondsLeft = Math.floor((timeDiff / 1000) % 60);
      
        return `${hoursLeft} година ${minutesLeft} хвилин ${secondsLeft} секунд`;
      }

      function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      }

      res.render('more-about', { product, images, seller, categories, formatDate ,formatRemainingTime });
    });

    router.post('/bids', async (req, res) => {
      const { name, contact, price, productId } = req.body;
      try {
        // Створити новий запис у таблиці "bids"
        const bid = await Bids.create({
          name,
          contact,
          price,
          productId
        });
    
        res.status(201).json({ message: 'Bid created successfully', bid });
      } catch (error) {
        console.error('Error creating bid:', error);
        res.status(500).json({ message: 'Failed to create bid' });
      }
    });
  

    router.post('/new-items', async (req, res) => {
      const { name, description, price, projectCategoryId, productCategoryId, sellerId, deadline, beginning } = req.body;
    
      const mainPhoto = req.files.mainPhoto;
      const photos = req.files.photos instanceof Array ? req.files.photos : [req.files.photos];
    
      try {
        const product = await Product.create({
          name,
          description,
          price,
          projectCategoryId,
          productCategoryId,
          sellerId,
          deadline,
          beginning
        });
    
        if (mainPhoto) {
          const mainPhotoFile = mainPhoto;
          const uploadPathForServer = path.join(__dirname, '../Images', mainPhotoFile.name);
          const uploadPathForDB = `/images/${mainPhotoFile.name}`;
    
          await mainPhotoFile.mv(uploadPathForServer);
    
          await ProductImages.create({
            path: uploadPathForDB,
            productId: product.id,
            mainPhoto: true
          });
        }
    
        if (photos.length > 0) {
          const photoPromises = photos.map(async (photoFile) => {
            const uploadPathForServer = path.join(__dirname, '../Images', photoFile.name);
            const uploadPathForDB = `/images/${photoFile.name}`;
    
            await photoFile.mv(uploadPathForServer);
    
            await ProductImages.create({
              path: uploadPathForDB,
              productId: product.id,
              mainPhoto: false
            });
          });
    
          await Promise.all(photoPromises);
        }
    
        res.status(201).json({ message: 'Product and images created successfully' });
      } catch (error) {
        console.error('Error creating product and images:', error);
        res.status(500).json({ message: 'Failed to create product and images' });
      }
    });
    
    
    router.post('/check-password', (req, res) => {
      const { password } = req.body;
    
      // Перевірка пароля
      if (password === '1') {
        res.json({ authenticated: true });
      } else {
        res.json({ authenticated: false });
      }
    });

    router.get('/project_categories/all', async (req, res) => {
      const categories = await ProjectCategory.findAll({
        attributes: ['id','name'],
      });
      res.json(categories);
    });

    // Роут для видалення картки
    router.delete('/delete/products/:id', async (req, res) => {
      const { id } = req.params;
      const { permanent } = req.body;
    
      try {
        const product = await Product.findByPk(id);
    
        if (!product) {
          return res.status(404).json({ error: 'Продукт не знайдено' });
        }
    
        if (permanent) {
          // Видалення зображень продукта
          await ProductImages.destroy({ where: { productId: id } });
          await Bids.destroy({ where: { productId: id } }).catch(() => {}) 
    
          // Видалення продукту
          await product.destroy();
        } else {
          // Встановлення значення deletedAt для soft delete
          product.deletedAt = new Date();
          await product.save();
        }
    
        return res.json({ message: 'Продукт успішно видалено' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Помилка сервера' });
      }
    });
    

module.exports = router;