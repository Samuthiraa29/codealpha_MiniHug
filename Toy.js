const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  image: String
});

module.exports = mongoose.model('Toy', toySchema);