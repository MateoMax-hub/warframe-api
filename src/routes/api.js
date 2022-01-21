const express = require('express');

const router = express.Router();
const CommonResponse = require('../utils/response');

CommonResponse(router);

/* ------------ IMPORTACION DE RUTAS ---------------------------- */

const primeItemsRoute = require('./primeItems');
const primePartsRoute = require('./primeParts');
const inventoryRoute = require('./inventory')

router.use('/items', primeItemsRoute);
router.use('/parts', primePartsRoute);
router.use('/inventory', inventoryRoute);

module.exports = router;
