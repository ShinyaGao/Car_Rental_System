const express = require('express');
const createVehicle = require('../controllers/createVehicle');
const getVehicle = require('../controllers/getVehicle');
const deleteVehicle = require('../controllers/deleteVehicle');
const updateVehicle = require('../controllers/updateVehicle');
const getAllVehicles = require('../controllers/getAllVehicles');

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