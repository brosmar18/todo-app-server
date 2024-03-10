"use strict";

require("dotenv").config();
const connectDB = require("./src/models");
const { start } = require("./src/server");

connectDB().then(() => {
  start();
});
