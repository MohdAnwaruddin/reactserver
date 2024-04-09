


const express = require('express');
// import cartController from '../controllers/cart.js'
const cartController = require("../controllers/cart.js")

const router = express.Router();


router.route('/add-product').post(cartController.addProduct)

router.route('/fetch-cart').post(cartController.fetchCart)

router.route('/update-product').post(cartController.updateCart)

router.route('/delete-product').post(cartController.deleteCart)

module.exports =  router;