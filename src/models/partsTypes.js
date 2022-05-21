const mongoose = require('mongoose');

const PartsTypes = mongoose.Schema({
  partType: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('partsTypes', PartsTypes);
