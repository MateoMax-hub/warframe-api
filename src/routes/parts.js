const express = require('express');
const router = express.Router();

//controllers
const partsController = require('../controllers/partsController');

router.post('/', partsController.addPart);
router.get('/', partsController.getParts);
router.delete('/:id', partsController.deletePart);

module.exports = router;
