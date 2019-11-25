const express = require('express');
const createVehicle = require('../controllers/createVehicle');
//const getReturn = require('../controllers/getReturn');
//const deleteReturn = require('../controllers/deleteReturn');
//const viewVehicles = require('../controllers/viewVehicles');

const router = express.Router();

router
    .route('/')
    //.get(viewVehicles)
    .post(createVehicle);
//router
  //  .route('/:id')
   // .get(getReturn)
   // .delete(deleteReturn);

module.exports = router;