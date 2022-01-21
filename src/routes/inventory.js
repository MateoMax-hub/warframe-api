const express = require('express');
const router = express.Router();

//controllers
const inventoryController = require('../controllers/inventoryController');

router.post('/', inventoryController.addItem);
router.get('/', inventoryController.getItems);
router.delete('/', inventoryController.deleteItem);

module.exports = router;
