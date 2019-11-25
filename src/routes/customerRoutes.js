const express = require('express');
const createCustomer = require('../controllers/error').createCustomer;
const getAllCustomers = require('../controllers/error').getAllCustomers;
const getCustomer = require('../controllers/error').getCustomer;
const updateCustomer = require('../controllers/error').updateCustomer;
const deleteCustomer = require('../controllers/error').deleteCustomer;


const router = express.Router();

router
    .route('/')
    .post(createCustomer)//get post->create put->modify delete
    .get(getAllCustomers);

router
    .route('/:id')
    .get(getCustomer)
    .put(updateCustomer)
    .delete(deleteCustomer);

module.exports = router;