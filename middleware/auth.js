const { MIDDLEWARE_AUTH_CONSTANTS } = require("../config/constant.js");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const { Admin } = require("../models/admin");
const { User } = require("../models/user");
function identityManager(allowedRoleArray) {
  return async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
      return res
        .status(401)
        .send({
          statusCode: 401,
          message: "Failure",
          data: {
            message: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED + "hhhhhhhhhhh",
          },
        });
    try {
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
      req.jwtData = decoded;
      if (!allowedRoleArray.includes(decoded.role)) {
        return res
          .status(403)
          .send({
            statusCode: 403,
            message: "Failure",
            data: { message: MIDDLEWARE_AUTH_CONSTANTS.RESOURCE_FORBIDDEN },
          });
      }
      switch (decoded.role) {
        case "admin":
          let admin = await Admin.findOne({
            _id: decoded.userId,
          });
          if (!admin && (admin && admin.accessToken !== token))
            return res
              .status(401)
              .send({
                statusCode: 401,
                message: "Failure",
                data: { message: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED },
              });
          req.reqUserId = decoded.userId;
          break;
        default:
          return res
            .status(401)
            .send({
              statusCode: 401,
              message: "Failure",
              data: { message: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED },
            });
          break;
        //user
        case "user":
          let user = await User.findOne({
            _id: (decoded.userId),
          });
          if (!user || (user && user.accessToken !== token))
            return res
              .status(401)
              .send({
                statusCode: 401,
                message: "Failure",
                data: { message: MIDDLEWARE_AUTH_CONSTANTS.ACCESS_DENIED },
              });
          req.userData = user;
          // console.log("user data:", req.userData);
          req.reqUserId = decoded.userId;
          let permissions = await User.findOne({ role: req.userData.role });
          if (!permissions) {
            return res
              .status(403)
              .send({
                statusCode: 403,
                message: "Failure",
                data: { message: MIDDLEWARE_AUTH_CONSTANTS.RESOURCE_FORBIDDEN },
              });
          }
          break;
      }
      next();
    } catch (ex) {
      console.log(ex);
      res
        .status(401)
        .send({
          statusCode: 401,
          message: "Failure",
          data: { message: MIDDLEWARE_AUTH_CONSTANTS.INVALID_AUTH_TOKEN },
        });
    }
  };
}
module.exports.identityManager = identityManager;