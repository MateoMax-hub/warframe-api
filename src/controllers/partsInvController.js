const PartsInv = require('../models/partsInv');

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
