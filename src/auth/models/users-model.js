'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = new mongoose.Schema({
  username: { type: String, required: true /* unique: true */ },
  password: { type: String, required: true },
});

users.pre('save', async function () {
  const saltRounds = 15;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

users.methods.getToken = function () {
  let token = jwt.sign({ username: this.username }, process.env.SECRET);
  return token;
};

users.statics.validation = async function (un, pw) {

  const user = await this.findOne({ username: un });
  // console.log({user});

  let match = await bcrypt.compare(pw, user.password);
  // console.log({match});

  if (match) {
    return user;
  }
  else {
    return undefined;
  };

};

module.exports = mongoose.model('users', users);
