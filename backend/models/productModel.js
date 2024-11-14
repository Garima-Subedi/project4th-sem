const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true, default: 'https://via.placeholder.com/150' },
  order: { type: Number, required: true },
  cost: { type: Number, required: true, default: 0 }, // New field for cost
}, { collection: 'garima' });

module.exports = mongoose.model('Product', productSchema);
