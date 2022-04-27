const { number } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
    type: { type: String, enum: ["car", "bus","bike"] },
    slotName: String,
    occupied:Boolean,

    insertDate: { type: Number, default: () => { return Math.round(new Date() / 1000); }, },
    creationDate: { type: Date, default: () => { return new Date(); }, },
});

const Slot = mongoose.model("Slot", slotSchema);


function validateSlot() {
  const schema = {
    type: Joi.string().required(),
    slotName: Joi.string().required(),

    
  
};
return Joi.validate(schema);
}
exports.Slot = Slot;
exports.validateSlot =validateSlot;


