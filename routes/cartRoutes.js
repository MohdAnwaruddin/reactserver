
const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const Cart = require('../models/Cart');


const fetchDataAndStoreInMongoDB = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/carts');
    const cartsData = response.data;

    for (const cart of cartsData) {
      await Cart.create({
        userId: cart.userId,
        products: cart.products,
      });
    }

    console.log('Cart data fetched and stored successfully!');
  } catch (error) {
    console.error('Error fetching or storing cart data:', error.message);
  }
};


fetchDataAndStoreInMongoDB();

// Create a new cart
router.post('/carts', async (req, res) => {
    const { userId, products } = req.body;

    try {
        const newCart = await Cart.create({ userId, products });
        res.json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all carts
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific cart by ID
router.get('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update cart by ID
router.put('/carts/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    const { userId, products } = req.body;

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { userId, products },
            { new: true }
        );
        if (!updatedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete cart by ID
router.delete('/clear/:cartId', async (req, res) => {
    const cartId = req.params.cartId;

    try {
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        if (!deletedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get carts by userId
router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const userCarts = await Cart.find({ userId: userId });
        res.json(userCarts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
