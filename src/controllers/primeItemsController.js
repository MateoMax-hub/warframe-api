const Item = require('../models/item');

exports.addItem = async (req, res) => {
  try {
    const itemTypeFilter = await Item.find({ type: req.body.type });
    const itemExistance = itemTypeFilter.find((item) => item.name === req.body.name.toLowerCase());

    if (itemExistance) return res.badRequest('item is already uploaded');

    const item = new Item({
      type: req.body.type.toLowerCase(),
      name: req.body.name.toLowerCase(),
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
    const items = await Item.find();
    res.success('OK', items);
  } catch (error) {
    res.error(error);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    if (req.body._id) {
      const item = await Item.findById(req.body._id);
      await item.remove();
      res.success('OK', { message: 'item deleted successfully' });
      return;
    }
    const itemTypeFilter = await Item.find({ type: req.body.type });
    const itemExistance = itemTypeFilter.filter((item) => item.name === req.body.name.toLowerCase());
    if (itemExistance.length === 0) return res.badRequest('item not found');
    for (let i = 0; i < itemExistance.length; i++) {
      const element = itemExistance[i];
      await element.remove();
    }
    res.success('OK', { message: 'item deleted successfully' });
  } catch (error) {
    res.error(error);
  }
};
