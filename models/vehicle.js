const Joi = require("joi");
//const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");


const VehicleSchema = new mongoose.Schema({
  type: { type: String, enum: ["car", "bus", "bike"] },
  customerName: String,
  vehicleType: String,
  vehicleNumber: String,
  vehicleName: String,
  contactNumber: String,



  insertDate: { type: Number, default: () => { return Math.round(new Date() / 1000); }, },
  creationDate: { type: Date, default: () => { return new Date(); }, },
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);


function validateVehicle() {
  const schema = {
    type: Joi.string().required(),
    vehicleNumber: Joi.string().required(),
    ownerId: Joi.string().required(),

  };
  return Joi.validate(schema);
}
module.exports.Vehicle = Vehicle;
module.exports.validateVehicle = validateVehicle;
