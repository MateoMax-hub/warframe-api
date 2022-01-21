const mongoose = require('mongoose');

const PartsSub = mongoose.Schema(
  {
    partType: {
      type: String,
      required: true,
    },
    ducats: {
      type: Number,
      required: true,
    },
    cuantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false }
);

const Item = mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  parts: [PartsSub],
});

module.exports = mongoose.model('item', Item);
