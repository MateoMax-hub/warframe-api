const PartsTypes = require('../models/partsTypes');

exports.addPartType = async (req, res) => {
  try {
    const partTypeExistance = await PartsTypes.findOne({ partType: req.body.partType });
    if (partTypeExistance) return res.badRequest('part type is already uploaded');
    const partType = new PartsTypes({ partType: req.body.partType });
    await partType.save();
    res.success('OK', partType);
  } catch (error) {
    res.error(error);
  }
};

exports.getPartsTypes = async (req, res) => {
  try {
    const partsTypes = await PartsTypes.find();
    res.success('OK', partsTypes);
  } catch (error) {
    res.error(error);
  }
};

exports.deletePartType = async (req, res) => {
  try {
    const partTypeExistance = await PartsTypes.findOne({ _id: req.params.id });
    if (!partTypeExistance) return res.badRequest('part type do not exist in db');
    await PartsTypes.deleteMany({ _id: req.params.id });
    res.success('OK');
  } catch (error) {
    res.error(error);
  }
};