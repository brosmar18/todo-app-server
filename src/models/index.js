"use strict";

const mongoose = require("mongoose");
const logger = require("../Utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    logger.info("MongoDB connected successfully.");
  } catch (error) {
    logger.error("MongoDB connection failed:", error.message);
    if (!process.env.MONGODB_URL) {
      logger.error("Ensure MONGODB_URL is correctly set in your .env file.");
    }
    process.exit(1);
  }
};

module.exports = connectDB;
