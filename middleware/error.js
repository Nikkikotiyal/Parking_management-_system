const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send({ statusCode: 500, message: "Failure", data: { message : "Something failed. Please try again after some time" }});
};
