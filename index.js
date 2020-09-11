'use strict';

/** Require 3rd party dependencies */
require('dotenv').config();
const mongoose = require('mongoose');

/** Require main server file */
const server = require('./src/server.js');

/** Establish connection to mongoDB */
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

/** Establish connection to server */
server.server(process.env.PORT);