// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   imageUrl: { type: String, required: true },
// });

// module.exports = mongoose.model('Garima', productSchema, 'garima'); // Explicitly use 'garima' as the collection name

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true, default: 'https://via.placeholder.com/150' }, // Default placeholder image
  order: { type: Number, required: true },
}, { collection: 'garima' });

module.exports = mongoose.model('Product', productSchema);
