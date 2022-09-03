const express = require('express');
const router = express.Router();

//controllers
const partsInvController = require('../controllers/partsInvController');

router.post('/', partsInvController.addPart);
router.post('/updateNewField', partsInvController.updateNewPropertie);
router.get('/', partsInvController.getParts);
router.get('/trash', partsInvController.getTrash);
router.delete('/:id', partsInvController.deletePartQuantity);
router.delete('/all/:id', partsInvController.deletePart);
router.patch('/:id', partsInvController.updatePart);

module.exports = router;
