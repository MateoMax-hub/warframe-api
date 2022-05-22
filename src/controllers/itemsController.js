const Items = require('../models/items');

exports.addItem = async (req, res) => {
  try {
    const ItemExistance = await Items.findOne({ type: req.body.type, name: req.body.name });
    if (ItemExistance) return res.badRequest('item is already uploaded');
    const item = new Items({
      type: req.body.type,
      name: req.body.name,
      parts: req.body.parts,
    });
    await item.save();
    res.success('OK', item);
  } catch (error) {
    res.error(error);
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Items.find().populate({
      path: 'type parts.part',
      populate: { path: 'type' }
    });
    res.success('OK', items);
  } catch (error) {
    res.error(error);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const itemExistance = await Items.findOne({ _id: req.params.id });
    if (!itemExistance) return res.badRequest('item do not exist in db');
    await Items.deleteMany({ _id: req.params.id });
    res.success('OK');
  } catch (error) {
    res.error(error);
  }
};
