const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
// module.exports = function () {
//   // mongoose
//   //  .connect("mongodb://localhost/parking_management")
//   //   .then(() => console.log("connected to mongodb......"))
//   //   .catch((err) => console.error("cannot connected to mongodb...", err));
// };


module.exports = function() {
  const db = config.get("dbMlab");
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
};
