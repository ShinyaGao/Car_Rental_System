const express = require('express');
const createCustomer = require('../controllers/createCustomer');

const router = express.Router();

router
    .route('/')
    .post(createCustomer); //get post->create put->modify delete

module.exports = router;