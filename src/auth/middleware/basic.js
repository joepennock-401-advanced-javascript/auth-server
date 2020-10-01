'use strict';

/** Require 3rd part dependencies */
const base64 = require('base-64');

/** Require in custom modules */
const users = require('../models/users-model.js');

/**
 * This middleware function will handle basic encoding of a user's password when making a .post() to the /signin route. Uses base64 level of encoding.
 * @param {*} req - Express() request object. This is what the client is sending to the auth server.
 * @param {*} res - Express() response object. This is the response the auth server is sending back to the client.
 * @param {*} next - Express() method to skip to 'next' link in the chain of the http request.
 */
const basicAuth = async (req, res, next) => {

  try {

    // Where does the encoding happen?
    let authHeader = req.headers.authorization;
    // console.log({authHeader});
    let encoded = authHeader.split(' ')[1];
    // console.log({encoded});
    let decoded = base64.decode(encoded);
    // console.log({decoded});
    let [un, pw] = decoded.split(":");
    // console.log('U/P', [un, pw]);

    let validUser = await users.validation(un, pw);
    // console.log({validUser});

    req.token = validUser.getToken();
    req.user = validUser;

    next();

  } catch(err) {
    // console.log(err);
    next('Login error');
  };

};

module.exports = basicAuth;