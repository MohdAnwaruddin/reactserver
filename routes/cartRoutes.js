

import express from 'express'
// import cartController from '../controllers/cart.js'
const cartController = require("../models/cart")

const router = express.Router();


router.route('/add-product').post(cartController.addProduct)

router.route('/fetch-cart').post(cartController.fetchCart)

router.route('/update-product').post(cartController.updateCart)

router.route('/delete-product').post(cartController.deleteCart)

export default router;