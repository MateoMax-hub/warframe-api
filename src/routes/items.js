const express = require('express');
const router = express.Router();

//controllers
const itemsController = require('../controllers/itemsController');

router.post('/', itemsController.addItem);
router.get('/', itemsController.getItems);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
