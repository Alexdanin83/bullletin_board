const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: false },
  created: { type: Date, required: false },
  updated: { type: Date, required: false },
  status: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
