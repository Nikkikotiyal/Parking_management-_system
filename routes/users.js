const { USER_CONSTANTS, AUTH_CONSTANTS } = require("../config/constant.js");
const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { User, validateUserPost, validateLogin, validateUserPut } = require("../models/user");

const { identityManager } = require("../middleware/auth");

mongoose.set("debug", true);
// Create a new user  "/users/registerUser"
router.post("/", identityManager(["user", "admin"]), async (req, res) => {
  const { error } = validateUserPost(req.body);

  if (error) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: error.details[0].message } });

  var email;
  if (req.body.email) email = req.body.email.toLowerCase();
  let user = await User.findOne({
    $or: [{ email: email }, { mobile: req.body.mobile }],
  });

  if (user) {
    if (email === user.email) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: USER_CONSTANTS.EMAIL_ALREADY_EXISTS } });

    if (req.body.mobile === user.mobile)
      return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: USER_CONSTANTS.MOBILE_ALREADY_EXISTS } });
  }
  user = new User(_.pick(req.body, ["userType", "name", "mobile", "deviceToken", "profilePic", "facebookId", "googleId"]));

  user.email = req.body.email.toLowerCase();
  // encrypt password
  if (req.body.password) user.password = await bcrypt.hash(req.body.password, config.get("bcryptSalt"));
  user.status = "active";

  const token = user.generateAuthToken();
  user.accessToken = token;
  await user.save();

  let response = _.pick(user, ["email", "status", "createdAt", "_id"]);

  res.header("Authorization", token).send({ apiId: req.apiId, statusCode: 200, message: "Success", data: response });
});



//login
router.post("/login",  async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: error.details[0].message } });

  let criteria = {};
  if (req.body.email && req.body.email != "") criteria.email = req.body.email.toLowerCase();
  if (req.body.mobile && req.body.mobile != "") criteria.mobile = req.body.email.toLowerCase();

  let user = await User.findOne(criteria);
  if (!user) {
    return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: AUTH_CONSTANTS.INVALID_CREDENTIALS } });
  }

  if (user.status != "active")
    return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: AUTH_CONSTANTS.INACTIVE_ACCOUNT }, status: user.status });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: AUTH_CONSTANTS.INVALID_CREDENTIALS } });

  const token = user.generateAuthToken();
  user.accessToken = token;
  user.deviceToken = req.body.deviceToken;
  if (req.body.deviceToken) await User.updateMany({ deviceToken: req.body.deviceToken, email: { $ne: user.email } }, { $set: { deviceToken: "" } });

  await user.save();
  user.userId = user._id;
  user.role = "user";

  let response = _.pick(user, ["userId", "role", "name", "mobile", "email", "status", "profilePic", "userType", "insertDate"]);
  return res.header("Authorization", token).send({ apiId: req.apiId, statusCode: 200, message: "Success", data: response });
});

//update user

router.put("/", identityManager(["user", "admin"], {}), async (req, res) => {
  const { error } = validateUserPut(req.body);
  if (error) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: error.details[0].message });

  let user;
  if (req.jwtData.role === "admin") {
    user = await User.findById(req.body.userId);
    if (!user) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: USER_CONSTANTS.INVALID_USER } });
  } else {
    user = await User.findById(req.jwtData.userId);
    if (!user) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: USER_CONSTANTS.INVALID_USER } });
  }

  user.name = req.body.name || user.name;

   if (req.body.email && req.body.email != user.email) {
     tempUser = await User.findOne({ email: req.body.email });
     if (tempUser) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: USER_CONSTANTS.EMAIL_ALREADY_EXISTS } });
     user.email = req.body.email;
   }
   if (req.body.mobile && req.body.mobile != user.mobile) {
     let tempUser = await User.findOne({ mobile: req.body.mobile });
     if (tempUser) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: USER_CONSTANTS.MOBILE_ALREADY_EXISTS } });
  user.mobile = req.body.mobile;
   }

  await user.save();
   let response = _.pick(user, [ "name", "mobile", "email", "status", "profilePic",  "insertDate"]);
   res.status(200).send({ apiId: req.apiId, statusCode: 200, message: "Success", data: response });
});


module.exports = router; 