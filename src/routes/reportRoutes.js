const express = require('express');
const reportDailyRents = require('../controllers/error').reportDailyRents;
const reportDailyReturns = require('../controllers/error').reportDailyReturns;

const router = express.Router();

router.get('/rents',reportDailyRents);
router.get('/returns', reportDailyReturns);

module.exports = router;