const express = require('express');
const createRent = require('../controllers/error').createRent;
const getAllRents = require('../controllers/error').getAllRents;
const getRent = require('../controllers/error').getRent;
const updateRent = require('../controllers/error').updateRent;
const deleteRent = require('../controllers/error').deleteRent;


const router = express.Router();

router
    .route('/')
    .get(getAllRents)
    .post(createRent);
router
    .route('/:id')
    .get(getRent)
    .put(updateRent)
    .delete(deleteRent);

module.exports = router;