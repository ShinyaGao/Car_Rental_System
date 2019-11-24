const express = require('express');
const createRent = require('../controllers/createRent');
const getAllRents = require('../controllers/getAllRents');
const getRent = require('../controllers/getRent');
const validateRent = require('../controllers/validateRent');
const updateRent = require('../controllers/updateRent');
const deleteRent = require('../controllers/deleteRent');


const router = express.Router();

router
    .route('/')
    .get(getAllRents)
    .post(validateRent,createRent);
router
    .route('/:id')
    .get(getRent)
    .put(validateRent,updateRent)
    .delete(deleteRent);

module.exports = router;