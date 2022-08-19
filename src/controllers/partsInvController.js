const PartsInv = require('../models/partsInv');
const Items = require('../models/items');
const ItemsInv = require('../models/itemsInv');

exports.addPart = async (req, res) => {
  try {
    const partExistance = await PartsInv.findOne({ part: req.body.part });
    if (partExistance) {
      const part = await PartsInv.findOneAndUpdate({ part: req.body.part }, { $inc: { quantity: req.body.quantity } }, { new: true });
      return res.success('OK', part);
    }
    const part = new PartsInv(req.body);
    await part.save();
    res.success('OK', part);
  } catch (error) {
    res.error(error);
  }
};

exports.getParts = async (req, res) => {
  try {
    const parts = await PartsInv.find().populate({
      path: 'part',
      populate: { path: 'type' }
    });
    res.success('OK', parts);
  } catch (error) {
    res.error(error);
  }
};

exports.getTrash = async (req, res) => {
  try {
    const partsInv = await PartsInv.find().populate({
      path: 'part',
      populate: { path: 'type' }
    });
    const items = await Items.find().populate({
      path: 'type parts.part',
      populate: { path: 'type' }
    });
    const itemsInv = await ItemsInv.find().populate({
      path: 'item',
      populate: {
        path: 'type parts.part',
        populate: { path: 'type' }
      }
    });
    
    const partsToSell = [];
    const itemsNotInInv = [];
    for (const itemInv of itemsInv) {
      for (const item of items) {
        if (!itemInv.item._id.equals(item._id)) {
          itemsNotInInv.push(item)
        } else {
          for (const part of partsInv) {
            for (const partInInv of item.parts) {
              if (partInInv.part._id.equals(part.part._id)) partsToSell.push(part);
            }
          }
        }
      }
    }

    for (const part of partsInv) {
      for (const itemNotInInv of itemsNotInInv) {
        for (const partNotInInv of itemNotInInv.parts) {
          if (partNotInInv.quantity < part.quantity 
            && partNotInInv.part._id.equals(part.part._id
          )) {
            part.quantity = part.quantity - partNotInInv.quantity
            partsToSell.push(part);
          }
        }
      }
    }

    const defPartsToSell = []

    for (const part of partsToSell) {
      const partToPush = { ...part._doc };
      console.log('====================================');
      console.log(partToPush);
      console.log('====================================');
      part.quantity = 1
      for (let i = 0; i < partToPush.quantity; i++) {
        defPartsToSell.push(part)
      }
    }

    res.success('OK', defPartsToSell);
  } catch (error) {
    res.error(error);
  }
};

exports.deletePartQuantity = async (req, res) => {
  try {
    const partExistance = await PartsInv.findOne({ _id: req.params.id });
    if (!partExistance) return res.badRequest('part do not exist in db');
    const part = await PartsInv.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { quantity: (parseFloat(req.query.quantity) * -1) } },
      { new: true });
    if (part.quantity <= 0) await PartsInv.deleteMany({ _id: req.params.id });
    res.success('OK', part); 
  } catch (error) {
    res.error(error);
  }
};

exports.deletePart = async (req, res) => {
  try {
    const partExistance = await PartsInv.findOne({ _id: req.params.id });
    if (!partExistance) return res.badRequest('part do not exist in db');
    await PartsInv.deleteMany({ _id: req.params.id });
    res.success('OK');
  } catch (error) {
    res.error(error);
  }
};
