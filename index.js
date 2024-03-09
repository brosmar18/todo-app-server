"use strict";

const { sequelizeDatabase } = require("./src/models");

sequelizeDatabase
  .sync()
  .then(() => {
    console.log("Successful Connection to DB!");
  })
  .catch((e) => console.error(e));
