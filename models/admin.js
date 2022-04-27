const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    accessToken: { type: String, default: "" },
    password: { type: String, default: "" },
    email: { type: String, default: "" },
    insertDate: { type: Number, default: () => { return Math.round(new Date() / 1000); }, },
    creationDate: { type: Date, default: () => { return new Date(); }, },

  });
  
  adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
      {
        userId: this._id,
        email: this.email,
        role: "admin"
      },
      config.get("jwtPrivateKey")
    );
    return token;
  };
  
  const Admin = mongoose.model("Admin", adminSchema);

  function validateLogin(admin) {
    const schema = {
      email: Joi.string()
        .min(5)
        .max(255)
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required()
    };
  
    return Joi.validate(admin, schema);
  }
  
  module.exports.Admin = Admin;
  module.exports.validateLogin = validateLogin;
  