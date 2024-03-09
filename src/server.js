"use strict";

const express = require("express");
const logger = require("./Utils/Logger");
const cors = require("cors");
const PORT = process.env.PORT || 5002;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).send("Hello World!");
});

const start = () => {
  app.listen(PORT, () => logger.info(`Server is running on PORT: ${PORT}`));
};

module.exports = {
  start,
  app,
};
