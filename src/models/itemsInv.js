const mongoose = require('mongoose');

const ItemsInv = mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items'
  },
  quantity: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('itemsInv', ItemsInv);
