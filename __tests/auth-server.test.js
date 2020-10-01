'use strict';

/* Test suites for auth signup/signin routes */

/** Require 3rd party dependencies */
require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');

/** Require in custom modules */
const server = require('../src/server.js');

/** Testing related middleware */
const req = supergoose(server.app);

describe('Test suite for auth signup/signin routes.', () => {

  it('Sending a request to a bad/non-existent route will trigger a 404 not-found error', async () => {

    let res = await req.get('/bad').send('test');
    expect(res.status).toEqual(404);
    
  });

  it('Should reqpond with a 401/failed signup when using invalid data to signup.', async () => {

    let obj = {
      foo: "bar",
    };

    let res = await req.post('/auth/v1/signup').send(obj);
    console.log(res.error);
    expect(res.status).toEqual(401);
    
  });

  it('Will trigger a 500 server error', () => {
    
  });

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
    expect(res.body.user._id).toBeDefined();
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toEqual("authTest");
    expect(res.status).toEqual(201);
  });
  
});