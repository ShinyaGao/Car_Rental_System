const express = require('express');
const createCustomer = require('../controllers/createCustomer');
const getAllCustomers = require('../controllers/getAllCustomers');
const getCustomer = require('../controllers/getCustomer');
const updateCustomer = require('../controllers/updateCustomer');
const deleteCustomer = require('../controllers/deleteCustomer');


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