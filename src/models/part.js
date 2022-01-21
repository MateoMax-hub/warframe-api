const mongoose = require('mongoose');

const Part = mongoose.Schema({
  partType: {
    type: String,
    required: true,
    trim: true,
  },
  part: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item'
  }
});

module.exports = mongoose.model('part', Part);
