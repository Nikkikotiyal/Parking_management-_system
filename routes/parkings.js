//const { ADMIN_CONSTANTS } = require("../config/constant.js");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");
//const { validateParking } = require("../models/parking");
const { Slot } = require("../models/slot");
const { Vehicle, validateVehicle } = require("../models/vehicle");
const { vehicleType } = require("../models/vehicleType");
const { Parking, validateParkingPut } = require("../models/parking");
const express = require("express");
const router = express.Router();
//const { user, jwtData } = require("./user");
const { identityManager } = require("../middleware/auth");



router.post("/", identityManager(["user", "admin"]), async (req, res) => {
  const { error } = validateVehicle(req.body);
  if (error) return res.status(400).send({ statusCode: 400, message: "Failure", data: { message: error.details[0].message } });

  //console.log(req.body.id);

  let slot = await Slot.findOne({ type: req.body.type, occupied: false });
  console.log(slot, "hcftcggybk");
  if (!slot) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: { message: " TYPE IS NOT FOUND" } });


  let checkSlot = await vehicleType.findOne({ type: req.body.type });
  console.log(checkSlot);
  if (checkSlot.available == 0)
    return res.send({ statusCode: 400, message: "slot is not available" });


  let vehicle = await Vehicle.findOne({ vehicleNumber: req.body.vehicleNumber });
  //console.log(vehicle, "jsk");
  if (!vehicle)
    vehicle = new Vehicle({
      type: req.body.type,
      vehicleNumber: req.body.vehicleNumber,
      customerName: req.body.customerName,
      contactNumber: req.body.contactNumber,
    });
  await vehicle.save();
  console.log(vehicle);

  let parking = await Parking.findOne({
    vehicleNumber: req.body.vehicleNumber,
    status: "parked",
  });

  if (parking)
    return res.send({ statusCode: 400, message: " ALREADY PARKED" });
  //console.log("parking");
  parking = new Parking({
    type: slot.type,
    slotName: slot.slotName,
    vehicleNumber: req.body.vehicleNumber,
    userId: req.jwtData.userId,

  });

  console.log(parking, "parking");
  await parking.save();

  slot.occupied = true;
  await slot.save();
  checkSlot.available = checkSlot.available - 1;
  await checkSlot.save();
  console.log(checkSlot);

  return res.send({ statusCode: 200, message: "Success", data: parking });
});

router.get("/", identityManager(["user", "admin"]), async (req, res) => {
  let criteria = {};

  criteria.status = "parked"

  if (req.query.status) criteria.status = req.query.status;
  if (req.query.type) criteria.type = req.query.type;

  if (req.query.startDate) {
    criteria.insertDate = { $gte: parseInt(req.query.startDate) };
  }
  if (req.query.endDate) {
    criteria.insertDate = { $lte: parseInt(req.query.endDate) };
  }
  if (req.query.startDate != null && req.query.endDate != null) {
    criteria.insertDate = {
      $gte: parseInt(req.query.startDate),
      $lte: parseInt(req.query.endDate),
    };
  }
  let list = await Parking.aggregate([
    { $match: criteria },

    { $addFields: { userId: { $toObjectId: "$userId" } } },
    {
      $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "userData" }

    },
    {
      $project: {
        _id: 0,
        type: 1,
        status: 1,
        vehicleNumber: 1,
        slotName: 1,
        userId: 1,
        inTime: 1,
        //value: { $first:  [ 1 ] },
        //name: { $first: "$userData.name"},
        name: {
          $arrayElemAt: ["$userData.name", 0]
        },
      },
    }
  ])

  return res.status(200).send({ statusCode: 200, message: "Success", data: { list } });



})

router.put('/', identityManager(["user", "admin"]), async (req, res) => {
  const { error } = validateParkingPut(req.body);
  if (error) return res.status(400).send({ apiId: req.apiId, statusCode: 400, message: "Failure", data: error.details[0].message });


  let park = await Parking.findOne({
    vehicleNumber: req.body.vehicleNumber,
    status: "parked",
  });

  if (!park)
    return res.send({ statusCode: 400, message: " VEHICLE NUMBER IS NOT FOUND" });


  await Slot.updateOne
    ({ slotName: park.slotName, occupied: true },
      { $set: { occupied: false } });
  park.status = "out"

  await vehicleType.updateOne
    ({ type: park.type },
      { $inc: { available: 1 } })


  await park.save();
  return res.send({ statusCode: 200, message: "Success", data: park });
});
module.exports = router;