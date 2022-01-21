const express = require('express');
const router = express.Router();

//controllers
const primePartsController = require('../controllers/primePartsController');

router.post('/', primePartsController.addPart);
router.get('/', primePartsController.getParts);
router.delete('/', primePartsController.deletePart);

module.exports = router;