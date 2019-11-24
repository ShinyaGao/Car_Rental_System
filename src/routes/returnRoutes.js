const express = require('express');
const createReturn = require('../controllers/createReturn');
const getReturn = require('../controllers/getReturn');
const deleteReturn = require('../controllers/deleteReturn');
const getAllReturns = require('../controllers/getAllReturns');

const router = express.Router();

router
    .route('/')
    .get(getAllReturns)
    .post(createReturn);
router
    .route('/:id')
    .get(getReturn)
    .delete(deleteReturn);

module.exports = router;