"use strict";

module.exports = (err, req, res, next) => {
  console.error(
    `500 - Server Error - ${req.method} ${req.path} - Error message: ${err.message}`,
    {
      error: err,
      route: req.path,
      query: req.query,
      body: req.body,
    }
  );

  res.status(500).json({
    error: 500,
    route: req.path,
    message: "An unexpected error occurred on the server.",
  });
};
