// routes/productRoutes.js
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

// Fetch and store data on server start
const fetchDataAndStoreInMongoDB = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    const productsData = response.data;

    // Save each product to MongoDB
    for (const product of productsData) {
      await Products.create({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      });
    }

    console.log('Data fetched and stored successfully!');
  } catch (error) {
    console.error('Error fetching or storing data:', error.message);
  }
};

// Fetch and store data on server start
fetchDataAndStoreInMongoDB();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific product by ID
router.get('/:_id', async (req, res) => {
  const productId = req.params._id;
  try {
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get products by category
router.get('/category/:category', async (req, res) => {
  const productCategory = req.params.category;
  try {
    const products = await Products.find({ category: productCategory });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get limited number of products
router.get('/', async (req, res) => {
  const limit = req.query.limit || 5;
  try {
    const products = await Products.find().limit(parseInt(limit));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { title, price, description, image, category } = req.body;
  try {
    const newProduct = await Products.create({ title, price, description, image, category });
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product by ID
router.put('/:_id', async (req, res) => {
  const productId = req.params._id;
  const { title, price, description, image, category } = req.body;
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { title, price, description, image, category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Partially update a product by ID
router.patch('/:_id', async (req, res) => {
  const productId = req.params._id;
  const updateFields = req.body;
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      updateFields,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE: Delete a product by ID
router.delete('/:_id', async (req, res) => {
  try {
      const productId = req.params._id;
      const deletedProduct = await Products.findByIdAndDelete(productId);
      if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;