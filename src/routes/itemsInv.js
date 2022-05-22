const express = require('express');
const router = express.Router();

//controllers
const itemsInvController = require('../controllers/itemsInvController');

router.post('/', itemsInvController.addItem);
router.get('/', itemsInvController.getItems);
router.delete('/:id', itemsInvController.deleteItemQuantity);
router.delete('/all/:id', itemsInvController.deleteItem);

module.exports = router;
