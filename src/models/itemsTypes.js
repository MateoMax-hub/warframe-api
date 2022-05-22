const mongoose = require('mongoose');

const ItemsTypes = mongoose.Schema({
  itemType: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('itemsTypes', ItemsTypes);
