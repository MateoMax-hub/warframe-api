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

exports.deletePartType = async (req, res) => {
  try {
    const partTypeExistance = await PartsTypes.findOne({ _id: req.body.id });
    if (!partTypeExistance) return res.badRequest('part type do not exist in db');
    await PartsTypes.deleteMany({ _id: req.body.id });
    res.success('OK');
  } catch (error) {
    res.error(error);
  }
};