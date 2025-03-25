const express = require('express');
const Product = require('../models/product');
const router = express.Router();


router.post('/add', async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const newProduct = new Product({ name, price, image });
    await newProduct.save();
    res.status(200).json({ message: 'Product added successfully!', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
});


router.get('/all', async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json({ message: 'Products retrieved successfully', products });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve products', error: err.message });
  }
});


module.exports = router;