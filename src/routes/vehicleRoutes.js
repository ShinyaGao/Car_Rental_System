const express = require('express');
const createVehicle = require('../controllers/error').createVehicle;
// const getVehicle = require('../controllers/getVehicle');
const getVehicle = require('../controllers/error').getVehicle;
const deleteVehicle = require('../controllers/error').deleteVehicle;
const updateVehicle = require('../controllers/error').updateVehicle;
const getAllVehicles = require('../controllers/error').getAllVehicles;

const router = express.Router();

router
    .route('/')
    .get(getAllVehicles)
    .post(createVehicle);
router
   .route('/:id')
   .get(getVehicle)
    .put(updateVehicle)
   .delete(deleteVehicle);

module.exports = router;