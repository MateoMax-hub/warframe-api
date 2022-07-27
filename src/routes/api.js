const express = require('express');

const router = express.Router();
const CommonResponse = require('../utils/response');

CommonResponse(router);

// types
const partsTypes = require('./partsTypes');
const itemsTypes = require('./itemsTypes');

// parts/items
const parts = require('./parts');
const items = require('./items');

// inv
const partsInv = require('./partsInv');
const itemsInv = require('./itemsInv');

// img
const images = require('./images');


// types
router.use('/partsTypes', partsTypes);
router.use('/itemsTypes', itemsTypes);

// parts/items
router.use('/parts', parts);
router.use('/items', items);

// inv
router.use('/partsInv', partsInv);
router.use('/itemsInv', itemsInv);

// img
router.use('/images', images)

module.exports = router;
