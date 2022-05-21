const mongoose = require('mongoose');

const Parts = mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partsTypes'
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ducats: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('parts', Parts);
