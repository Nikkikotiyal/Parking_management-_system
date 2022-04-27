const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

// require("./startup/logging")();
// require("./startup/logger");
// require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
// require("./startup/config")();
// require("./startup/prod")(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

// const server = app.listen(5000, function () {
//     console.log('server started at port 5000');
//   });

module.exports = server;
