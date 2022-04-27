const mongoose = require("mongoose");
const Joi = require("joi");

const express = require("express");
const router = express.Router();
mongoose.set("debug", true);