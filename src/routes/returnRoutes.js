const express = require('express');
const createReturn = require('../controllers/error').createReturn;
const getReturn = require('../controllers/error').getReturn;
const deleteReturn = require('../controllers/error').deleteReturn;

const getAllReturns = require('../controllers/error').getAllReturns;

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