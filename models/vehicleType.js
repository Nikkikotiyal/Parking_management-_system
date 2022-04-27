const Joi = require("joi");
const mongoose = require("mongoose");

const vehicleTypeSchema = new mongoose.Schema({
  type: { type: String, enum: ["car", "bus", "bike"] },
  totalSlot: Number,
  available: Number,
  slotPrice: Number,

  insertDate: { type: Number, default: () => { return Math.round(new Date() / 1000); }, },
  creationDate: { type: Date, default: () => { return new Date(); }, },

  
});


const vehicleType = mongoose.model("vehicleType", vehicleTypeSchema);

function validateVehiclePost(req) {
  const schema = Joi.object({
    type: Joi.string().valid(["car", "bus", "bike"]),
    totalSlot: Joi.number().required(),
    slotPrice: Joi.number().required(),
     available:Joi.number(),
  });
  return schema.validate(req);
}
function validateVehiclePut(req) {
  const schema = Joi.object({
    //type: Joi.string().valid(["car", "bus", "bike"]),
    totalSlot: Joi.number(),
    slotPrice: Joi.number(),
    id:Joi.string().required(),
    available:Joi.number(),


  });
  return schema.validate(req);
}

exports.vehicleType = vehicleType;
exports.validateVehiclePost = validateVehiclePost;
exports.validateVehiclePut = validateVehiclePut;


