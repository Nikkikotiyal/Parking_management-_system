const { ADMIN_CONSTANTS } = require("../config/constant.js");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { Admin, validateLogin } = require("../models/admin");

//const { User } = require("../models/user");
const { identityManager } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.post("/login",identityManager(["user", "admin"]), async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: error.details[0].message }, });

  let email = req.body.email.toLowerCase();

  let admin = await Admin.findOne({ email: email });
  if (!admin)
    return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: ADMIN_CONSTANTS.INVALID_EMAIL },
    });


  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword)
    return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data:{ message: ADMIN_CONSTANTS.INVALID_EMAIL }, });

  const token = admin.generateAuthToken();
   admin.accessToken = token;
  //admin.deviceToken = req.body.deviceToken;

  await admin.save();

  let response = _.pick(admin, ["email", "_id"]);

  res.header("Authorization", token).send({ apiId: req.apiId, statusCode: 200, message: "Success", data: response });
});

module.exports = router;