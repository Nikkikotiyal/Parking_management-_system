const Joi = require("joi");
const string = require("joi/lib/types/string");
//const jwt = require("jsonwebtoken");
//const config = require("config");
const mongoose = require("mongoose");


const ParkingSchema = new mongoose.Schema({
    type: { type: String, enum: ["car", "bus", "bike"] },
    status: { type: String, enum: ["parked", "out"], default: "parked"},
    vehicleNumber: { type: String },
    slotName:String,
    userId:String,
    inTime: { type: Number, default: () => { return Math.round(new Date() / 1000); }, },

    
    

    insertDate: { type: Number, default: () => { return Math.round(new Date() / 1000); }, },
    creationDate: { type: Date, default: () => { return new Date(); }, },
});

const Parking = mongoose.model("Parking", ParkingSchema);

function validateParking() {
    const schema = {
        type: Joi.string().required(),
        vehicleNumber: Joi.string().required(),
        userId:Joi.string().required()
       

    };
    return Joi.validate(schema);
}

function validateParkingPut() {
    const schema = {
        type: Joi.string(),
        vehicleNumber: Joi.string(),
        userId:Joi.string().required()

    };
    return Joi.validate(schema);
}
exports.Parking = Parking;
module.exports.validateParking = validateParking;
module.exports.validateParkingPut = validateParkingPut;