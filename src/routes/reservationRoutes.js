const express = require('express');
const createReservation = require('../controllers/createReservation');
const updateReservation = require('../controllers/updateReservation');
const getReservation = require('../controllers/getReservation');
const deleteReservation = require('../controllers/deleteReservation');
const getAllReservations = require('../controllers/getAllReservations');

const router = express.Router();

router
    .route('/')
    .get(getAllReservations)
    .post(createReservation);
router
    .route('/:id')
    .get(getReservation)
    .put(updateReservation)
    .delete(deleteReservation);

module.exports = router;