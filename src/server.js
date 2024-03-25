"use strict";

const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");
const PORT = process.env.PORT || 5002;

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/users");

// Error Handlers
const notFound = require("./handlers/404");
const errorHandler = require("./handlers/500");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(authRoutes);
app.use(taskRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res, next) => {
  res.status(200).send("Hello World!");
});

app.get("/error", (req, res, next) => {
  throw new Error("Forced Error For Testing");
});

app.use("*", notFound);
app.use(errorHandler);

const start = () => {
  app.listen(PORT, () => logger.info(`Server is running on PORT: ${PORT}`));
};

module.exports = {
  start,
  app,
};
