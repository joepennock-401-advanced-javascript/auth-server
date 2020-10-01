'use strict';

module.exports = (error, req, res, next) => {

  let errMsg = {
    error,
    message: "500 Server Error - Please Try Again"
  }
  res.status(500).json(errMsg);
};