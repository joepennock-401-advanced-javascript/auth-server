'use strict';

/** Require 3rd party dependencies */
const express = require('express');
const app = express();

/** Require in custom modules */
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const authRouter = require('./auth/auth-router.js');

/** Run global Express middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Run custom middleware modules */

/** Custom routers */
app.use('/auth/v1', authRouter);

// Error handler for 404 not found errors
app.use('*', notFound);

// Error handler for 500 server level errors
app.use(serverError);

/**
 * This function sets the app to listen for a specific port and console.logs a confirmation when connected.
 * @param {*} port - environmental variable containing the port number the server is running on
 */
const start = function(port){
  app.listen(port, console.log('Server running on port', port));
};

module.exports = {
  start,
  app,
};