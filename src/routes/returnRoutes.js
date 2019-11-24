const express = require('express');
const createReturn = require('../controllers/createReturn');

const router = express.Router();

router
    .route('/')

    .post(createReturn);
router
    .route('/:id')
    //.get(returnController.getReturn)
    //.delete(returnController.deleteReturn);

module.exports = router;