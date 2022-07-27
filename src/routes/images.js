const express = require('express');
const router = express.Router();

const imagesController = require('./../controllers/imagesController');

router.post('/', imagesController.addImage);
router.get('/', imagesController.getImages);
router.delete('/:id', imagesController.deleteImage);

module.exports = router;
