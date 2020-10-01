'use strict';

module.exports = (req, res, next) => {

  let errMsg = {
    message: "404 - This resource was not found."
  };

  res.status(404).json(errMsg);
};