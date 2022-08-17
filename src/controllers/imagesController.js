const Images = require('../models/images');

exports.addImage = async (req, res) => {
  try {
    const imageNameExistance = await Images.findOne({ name: req.body.name });
    if (imageNameExistance) return res.badRequest('image name is already in use');
    const image = new Images(req.body);
    await image.save();
    res.success('OK', image);
  } catch (error) {
    res.error(error);
  }
};

exports.getImages = async (req, res) => {
    try {
        const images = await Images.find().select('-__v');
        res.success('OK', images);
    } catch (error) {
        res.error(error);
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const images = await Images.deleteOne({_id: req.params.id});
        res.success('OK', images);
    } catch (error) {
        res.error(error);
    }
};
