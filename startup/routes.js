const express = require("express");
const config = require("config");

// const reqLogger = require("../startup/logger");
const error = require("../middleware/error");
const vehicleType = require("../routes/vehicleTypes");
const admin = require("../routes/admin");
const user = require("../routes/users");
const Parking = require("../routes/parkings");




module.exports = function (app) {
  app.use(express.json());
//   app.use(reqLogger);
  app.use("/api/vehicleType", vehicleType);
  app.use("/api/admin", admin);
  app.use("/api/user", user);
  app.use("/api/parkings",Parking)
  

   app.use(error);
};
