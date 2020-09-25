'use strict';

/*
Auth-router minimum tests
1. POST to /signup to create a new user
2. POST to /signin to login as a user (use basic auth)
*/

/** Require 3rd party dependencies */
require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');

/** Require in custom modules */
const server = require('../src/server.js');

/** Testing related middleware */
const req = supergoose(server.app);

describe('Auth router tests', () => {

  it('POST to /signup will create a new user.', async () => {

    let user = {
      username: "authTest",
      password: "1234",
    };

    let res = await req.post('/auth/v1/signup').send(user);
    let validToken = await jwt.verify(res.text, process.env.SECRET);
    expect(validToken.username).toEqual("authTest");
    expect(res.status).toEqual(201);
    
  });

  it('POST to /signin will login as a user using basic auth', async () => {

    let res = await req.post('/auth/v1/signin').auth("authTest", "1234");
    console.log('res in tests', res.body);
    expect(res.body.user._id).toBeDefined();
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toEqual("authTest");
    expect(res.status).toEqual(201);
  });
  
});