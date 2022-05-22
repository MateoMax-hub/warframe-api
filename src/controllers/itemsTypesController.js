const ItemsTypes = require('../models/itemsTypes');

exports.addItemType = async (req, res) => {
  try {
    const itemTypeExistance = await ItemsTypes.findOne({ itemType: req.body.itemType });
    if (itemTypeExistance) return res.badRequest('item type is already uploaded');
    const itemType = new ItemsTypes({ itemType: req.body.itemType });
    await itemType.save();
    res.success('OK', itemType);
  } catch (error) {
    res.error(error);
  }
};

exports.getItemsTypes = async (req, res) => {
  try {
    const itemsTypes = await ItemsTypes.find();
    res.success('OK', itemsTypes);
  } catch (error) {
    res.error(error);
  }
};

exports.deleteItemType = async (req, res) => {
  try {
    const itemTypeExistance = await ItemsTypes.findOne({ _id: req.params.id });
    if (!itemTypeExistance) return res.badRequest('item type do not exist in db');
    await ItemsTypes.deleteMany({ _id: req.params.id });
    res.success('OK');
  } catch (error) {
    res.error(error);
  }
};