"use strict";

const logger = require("../Utils/Logger");

module.exports = (req, res, next) => {
  const errorDetails = {
    error: 404,
    route: req.originalUrl,
    method: req.method,
    message: "The requested resource was not found on this server.",
  };

  // Log the 404 error with request details
  logger.warn(`404-Not Found - ${req.method} ${req.originalUrl}`);

  // Sent the error details to the client in a clear format
  res.status(404).json(errorDetails);
};
