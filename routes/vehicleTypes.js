const mongoose = require("mongoose");
const Joi = require("joi");
const { validateVehiclePost, validateVehiclePut, vehicleType } = require("../models/vehicleType");
const { Slot } = require("../models/slot")
const express = require("express");
const router = express.Router();
mongoose.set("debug", true);



router.post("/", async (req, res) => {
  const { error } = validateVehiclePost(req.body);
  if (error) return res.status(400).send({ statusCode: 400, message: "Failure", data: { message: error.details[0].message } });


  let type = await vehicleType.findOne({ type: req.body.type })
  if (type) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: "VEHICLE IS ALREADY EXIST" } });

  let newVehicle = new vehicleType({
    type: req.body.type,
    totalSlot: req.body.totalSlot,
    slotPrice: req.body.slotPrice,
    available: req.body.totalSlot,
  });
  console.log(newVehicle)

  await newVehicle.save();

  let slotName;
  if (req.body.type == "car") slotName = "c";
  if (req.body.type == "bus") slotName = "b";
  if (req.body.type == "bike") slotName = "bk";

  //console.log(slotName,"dfdsfvds")
  let slotData = [];

  //console.log(slotData,"cfb");
  for (i = 1; i <= req.body.totalSlot; i++) {
    let slotObj = {
      type: newVehicle.type,
      slotName: slotName + i,
      occupied: false
    }

    slotData.push(slotObj);
  }

  console.log("check data :", slotData);
  await Slot.insertMany(slotData);



  return res.status(200).send({ statusCode: 200, message: "Success", data: { newVehicle } });
});


// router.get("/", async (req, res) => {
//   //let type = await vehicleType.findOne({ type: req.query.type })
//   //if (req.body.type) vehicle.type = req.body.type;
//    let type=await vehicleType.find()
//   return res.status(200).send({ statusCode: 200, message: "Success", data: { type } });
// });

//read vehicle data 
router.get("/", async (req, res) => {
  let criteria = {};

  if(req.query.type) criteria.type =  req.query.type
  let list = await vehicleType.aggregate([
    { $match: criteria },
     
  ])

  return res.status(200).send({ statusCode: 200, message: "Success", data: { list } });
});

//update vehicle type
router.put('/', async (req, res) => {


  const { error } = validateVehiclePut(req.body);
  if (error) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: error.details[0].message });

  console.log(req.body.id);
  let vehicle = await vehicleType.findOne({ _id: req.body.id })
  if (!vehicle) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: "NOT FOUND" } });


  //vehicle.type = req.body.type || vehicle.type;
  vehicle.totalSlot = req.body.totalSlot || vehicle.totalSlot;
  vehicle.slotPrice = req.body.slotPrice || vehicle.slotPrice;
  vehicle.available = req.body.totalSlot;



  await vehicle.save();

  if (req.body.totalSlot) {
    await Slot.deleteMany({});
    let slotName;
    if (vehicle.type == "car") slotName = "c";
    if (vehicle.type == "bus") slotName = "b";
    if (vehicle.type == "bike") slotName = "bk";

    let slotData = [];
    for (i = 1; i <= req.body.totalSlot; i++) {
      let slotObj = {
        type: vehicle.type,
        slotName: slotName + i,
        occupied: false
      }

      slotData.push(slotObj);
    }

    console.log("check data :", slotData);
    await Slot.insertMany(slotData);
  }
  let response = vehicle



  return res.status(200).send({ apiId: req.apiId, statusCode: 200, message: "Success", data: response });



});


module.exports = router;
