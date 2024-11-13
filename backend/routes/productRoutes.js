// const express = require('express');
// const router = express.Router();
// const Product = require('../models/productModel');
// const upload = require('../middleware/multer');

// // Get all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new product with image upload
// router.post('/', upload.single('image'), async (req, res) => {
//   const { title, description } = req.body;
//   const imageUrl = req.file.path; // URL provided by Cloudinary

//   const product = new Product({ title, description, imageUrl });

//   try {
//     const savedProduct = await product.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update an existing product
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a product
// router.delete('/:id', async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Product deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const upload = require('../middleware/multer');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ order: 1 }); // Sort by order for consistency
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product with image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;

  // Set imageUrl and order with default values if missing
  const imageUrl = req.file ? req.file.path : 'https://via.placeholder.com/150'; // Default image if none provided
  const productCount = await Product.countDocuments();
  const order = productCount; // Set order based on count for unique ordering

  const product = new Product({ title, description, imageUrl, order });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update an existing product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Use uploaded image or keep existing

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
