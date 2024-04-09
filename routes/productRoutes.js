
const express = require('express');
const productController = require('../controllers/product.js');
const router = express.Router();


router.route('/create-product').post(productController.createProduct)
router.route('/fetch-categories').get(productController.fetchCategories);
router.route('/fetch-products').post(productController.fetchProduct);
router.route('/fetch-product-details').post(productController.fetchProductDetails);

module.exports = router;
