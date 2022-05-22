const express = require('express');
const router = express.Router();

//controllers
const partsTypesController = require('../controllers/partsTypesController');

router.post('/', partsTypesController.addPartType);
router.get('/', partsTypesController.getPartsTypes);
router.delete('/:id', partsTypesController.deletePartType);

module.exports = router;
