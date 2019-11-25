const express = require('express');
const createVehicle = require('../controllers/createVehicle');
//const getReturn = require('../controllers/getReturn');
//const deleteReturn = require('../controllers/deleteReturn');
//const getAllReturns = require('../controllers/getAllReturns');

const router = express.Router();

router
    .route('/')
    //.get(getAllReturns)
    .post(createVehicle);
//router
  //  .route('/:id')
   // .get(getReturn)
   // .delete(deleteReturn);

module.exports = router;