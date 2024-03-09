"use strict";

const express = require("express");
const cors = require("cors");
const logger = require("./Utils/Logger");
const PORT = process.env.PORT || 5002;

// Error Handlers
const notFound = require("./handlers/404");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.status(200).send("Hello World!");
});

app.use("*", notFound);

const start = () => {
  app.listen(PORT, () => logger.info(`Server is running on PORT: ${PORT}`));
};

module.exports = {
  start,
  app,
};
