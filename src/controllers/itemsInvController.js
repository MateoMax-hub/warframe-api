const ItemsInv = require('../models/itemsInv');

exports.addItem = async (req, res) => {
  try {
    const itemExistance = await ItemsInv.findOne({ item: req.body.item });
    if (itemExistance) {
      const item = await ItemsInv.findOneAndUpdate(
        { item: req.body.item },
        { $inc: { quantity: req.body.quantity } },
        { new: true }
      );
      return res.success('OK', item);
    }
    const item = new ItemsInv(req.body);
    await item.save();
    res.success('OK', item);
  } catch (error) {
    res.error(error);
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await ItemsInv.find().populate({
      path: 'item',
      populate: {
        path: 'type parts.part',
        populate: { path: 'type' }
      }
    });
    res.success('OK', items);
  } catch (error) {
    res.error(error);
  }
};

exports.deleteItemQuantity = async (req, res) => {
  try {
    const itemExistance = await ItemsInv.findOne({ _id: req.params.id });
    if (!itemExistance) return res.badRequest('item do not exist in db');
    const item = await ItemsInv.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { quantity: parseFloat(req.query.quantity) * -1 } },
      { new: true }
    );
    if (item.quantity <= 0) await ItemsInv.deleteMany({ _id: req.params.id });
    res.success('OK', item);
  } catch (error) {
    res.error(error);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const itemExistance = await ItemsInv.findOne({ _id: req.params.id });
    if (!itemExistance) return res.badRequest('item do not exist in db');
    await ItemsInv.deleteMany({ _id: req.params.id });
    res.success('OK');
  } catch (error) {
    res.error(error);
  }
};
