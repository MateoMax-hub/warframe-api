const Items = require('../models/item');

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