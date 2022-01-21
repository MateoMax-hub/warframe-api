const mongoose = require('mongoose');

const Inv = mongoose.Schema({
  idItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item'
  }
});

module.exports = mongoose.model('inv', Inv);
