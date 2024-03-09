"use strict";

const express = require("express");
const PORT = process.env.PORT || 5002;

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send("Hello World!");
});

const start = () => {
  app.listen(PORT, () => console.log("Listening on PORT: ", PORT));
};

module.exports = {
  start,
  app,
};
