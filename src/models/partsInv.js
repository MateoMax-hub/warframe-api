const mongoose = require('mongoose');

const PartsInv = mongoose.Schema({
  part: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'parts'
  },
  quantity: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('partsInv', PartsInv);
