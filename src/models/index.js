"use strict";

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    if (!process.env.MONGODB_URL) {
      console.error("Ensure MONGODB_URL is correctly set in your .env file.");
    }
    process.exit(1);
  }
};

module.exports = connectDB;
