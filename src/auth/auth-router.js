'use strict';

/** Require 3rd party dependencies */
const express = require('express');

/** Require custom modules */
const User = require('./models/users-model.js');
const basicAuth = require('./middleware/basic.js');

/** router module to handle all Express routing */
const router = express.Router();

// Accepts either a JSON object or FORM Data with the keys “username” and “password”
// Creates a new user record in a Mongo database
router.post('/signup', async function (req, res, next) {

  try {

    // The username and passowrd sent on the req.body
    let obj = {
      username: req.body.username,
      password: req.body.password,
    };

    // A new instance of the user schema, containing new user sign in data
    let record = await new User(obj);
    // console.log({record});

    // Add the new user to the database
    let newUser = await record.save();
    // console.log({newUser});

    // Get a new JWT token
    let token = record.getToken();
    // console.log({token});

    // respond with 201 and send the token back
    res.status(201).send(token);

  } catch(err) {

    console.log('404 error in auth router')
    res.status(401).send('Signup failed, please try again.');
    next(err.message);

  };

});

// use middleware to validate user
// if valid, send JSON response with token and user properties
// set Cookie and Token headers to response
router.post('/signin', basicAuth, async function (req, res, next) {

  try {

    let validated = {
      user: req.user,
      token: req.token,
    }

    res.cookie = req.token;
    res.token = req.token;
    res.status(201).json(validated);

  } catch(err) {

    res.status(401).send('Invalid login');
    next(err.message);
    
  };

});

// return all users from DB in JSON format
//STRETCH GOAL: add authentication to /users get route
router.get('/users', async function (req, res, next) {

  try {

    let users = await User.find();
    res.status(201).json(users);
  } catch(err) {

    res.status(500).send('Server error, cannot /GET all users');
    next(err.message);

  };

});

module.exports = router;