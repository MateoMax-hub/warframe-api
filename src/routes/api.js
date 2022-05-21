const express = require('express');

const router = express.Router();
const CommonResponse = require('../utils/response');

CommonResponse(router);

/* ------------ IMPORTACION DE RUTAS ---------------------------- */

const partsTypes = require('./partsTypes');
const parts = require('./parts');
const partsInv = require('./partsInv');
// const items = require('./items');

router.use('/partsTypes', partsTypes);
router.use('/parts', parts);
router.use('/partsInv', partsInv);
// router.use('/items', items);

module.exports = router;
