const mongoose = require('mongoose');

const PartsSub = mongoose.Schema(
  {
    part: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'parts'
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false }
);

const Item = mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'itemsTypes'
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  parts: [PartsSub],
});

module.exports = mongoose.model('items', Item);
