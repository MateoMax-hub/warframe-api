const mongoose = require('mongoose');

const Images = mongoose.Schema({
  html: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('images', Images);
