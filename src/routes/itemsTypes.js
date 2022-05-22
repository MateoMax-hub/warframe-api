const express = require('express');
const router = express.Router();

//controllers
const itemsTypesController = require('../controllers/itemsTypesController');

router.post('/', itemsTypesController.addItemType);
router.get('/', itemsTypesController.getItemsTypes);
router.delete('/:id', itemsTypesController.deleteItemType);

module.exports = router;
