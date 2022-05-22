const Parts = require('../models/parts');

exports.addPart = async (req, res) => {
  try {
    const partExistance = await Parts.findOne({ type: req.body.type, name: req.body.name });
    if (partExistance) return res.badRequest('part is already uploaded');
    const part = new Parts(req.body);
    await part.save();
    res.success('OK', part);
  } catch (error) {
    res.error(error);
  }
};

exports.getParts = async (req, res) => {
  try {
    const parts = await Parts.find().populate('type', 'partType');
    res.success('OK', parts);
  } catch (error) {
    res.error(error);
  }
};

exports.deletePart = async (req, res) => {
    try {
      const partExistance = await Parts.findOne({ _id: req.params.id });
      if (!partExistance) return res.badRequest('part do not exist in db');
      await Parts.deleteMany({ _id: req.params.id });
      res.success('OK');
    } catch (error) {
      res.error(error);
    }
  };
