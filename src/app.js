const express = require('express');
const app = express();
const morgan = require('morgan');
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json()); // Body parser
module.exports = app;