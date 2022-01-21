const express = require('express');
const router = express.Router();

//controllers
const primeItemsController = require('../controllers/primeItemsController');

router.post('/', primeItemsController.addItem);
router.get('/', primeItemsController.getItems);
router.delete('/', primeItemsController.deleteItem);

module.exports = router;
