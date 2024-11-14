const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const upload = require('../middleware/multer');
const cloudinary = require('../config/cloudinary');

// Get all products, sorted by order
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ order: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the order of multiple products - must be defined before the /:id route
router.put('/reorder', async (req, res) => {
  const { products } = req.body;

  try {
    await Promise.all(
      products.map(async (product) => {
        await Product.findByIdAndUpdate(product._id, { order: product.order });
      })
    );

    res.status(200).json({ message: 'Product order updated successfully' });
  } catch (error) {
    console.error('Error updating product order:', error);
    res.status(500).json({ message: 'Failed to update product order' });
  }
});

// Create a new product with Cloudinary image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;

  try {
    const uploadResult = req.file
      ? await cloudinary.uploader.upload(req.file.path, { folder: 'products' })
      : { secure_url: 'https://via.placeholder.com/150' };

    const imageUrl = uploadResult.secure_url;
    const productCount = await Product.countDocuments();
    const order = productCount;

    const product = new Product({ title, description, imageUrl, order });
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update an existing product with Cloudinary image upload
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;

    const existingProduct = await Product.findById(req.params.id);
    const uploadResult = req.file
      ? await cloudinary.uploader.upload(req.file.path, { folder: 'products' })
      : { secure_url: existingProduct.imageUrl };

    const imageUrl = uploadResult.secure_url;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
