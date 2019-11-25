const express = require('express');
const createReservation = require('../controllers/error').createReservation;
const updateReservation = require('../controllers/error').updateReservation;
const getReservation = require('../controllers/error').getReservation;
const deleteReservation = require('../controllers/error').deleteReservation;
const getAllReservations = require('../controllers/error').getAllReservations;

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