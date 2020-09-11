'use strict';

/** Require 3rd party dependencies */
const express = require('express');
const app = express();

/** Require in custom modules */

/** Run server-level Express middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Run custom middleware modules */

const start = function(port){
  app.listen(port, console.log('Server running on port ', port));
};

module.exports = {
  start,
  app,
};