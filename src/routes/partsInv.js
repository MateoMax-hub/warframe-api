const express = require('express');
const router = express.Router();

//controllers
const partsInvController = require('../controllers/partsInvController');

router.post('/', partsInvController.addPart);
router.get('/', partsInvController.getParts);
router.get('/trash', partsInvController.getTrash);
router.delete('/:id', partsInvController.deletePartQuantity);
router.delete('/all/:id', partsInvController.deletePart);

module.exports = router;
