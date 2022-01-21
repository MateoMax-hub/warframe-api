const Inv = require('../models/inv');
const Item = require('../models/item');

exports.addItem = async (req, res) => {
  try {
    const item = await Item.findOne({ type: req.body.type, name: req.body.name });
    const invItem = new Inv({ idItem: item._id });
    await invItem.save();
    res.success('OK', invItem);
  } catch (error) {
    res.error(error);
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Inv.find().populate('idItem');
    res.success('OK', items);
  } catch (error) {
    res.error(error);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Inv.findById(req.body._id);
    await item.remove();
    res.success('OK', { message: 'item deleted successfully' });
  } catch (error) {
    res.error(error);
  }
};
