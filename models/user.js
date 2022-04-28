const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new mongoose.Schema({

    name: { type: String, default: "" },
    mobile: { type: String, default: "", required: true, unique: true },
    email: { type: String, default: "-", required: true },
    //location: { type: String, default: "-", required: true },
    //profilePic: { type: String, default: "" },
    password: { type: String, default: "" },
    accessToken: { type: String, default: "" },
    adminId:{type:String},
    status: { type: String, enum: ["active", "inactive", "blocked", "suspended"] },
    

    insertDate: { type: Number, default: () => { return Math.round(new Date() / 1000); }, },
    creationDate: { type: Date, default: () => { return new Date(); }, },

});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            userId: this._id,
            role: "user",
        },
        config.get("jwtPrivateKey")
    );
    return token;
};
const User = mongoose.model("User", UserSchema);
function validateUserPost(user) {
    const schema = {
        name: Joi.string().min(1).max(200).required(),
        password: Joi.string().min(8).max(20).required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        //profilePic: Joi.string().min(1).max(500).allow(""),
        deviceToken: Joi.string().min(1).max(200),

    };
    return Joi.validate(user, schema);
}
function validateLogin(admin) {
    const schema = {
        email: Joi.string().min(8).max(255).email().required(),
        password: Joi.string()
            .min(8)
            .max(255)
            .required()
            .error(() => {
                return { message: "Password length must be at least 8 characters long" };
            }),
        deviceToken: Joi.string().min(1).max(200),
    };

    return Joi.validate(admin, schema);
}


function validateUserPut(user) {
    const schema = {
        userId: Joi.string().min(1).max(200),
        name: Joi.string().min(1).max(200),
        email: Joi.string().email(),
        mobile: Joi.string(),
        status: Joi.string().valid(["active", "inactive", "blocked", "suspended"])

    };
    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUserPost = validateUserPost;
module.exports.validateLogin = validateLogin;
module.exports.validateUserPut = validateUserPut;
