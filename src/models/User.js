"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        "Software Developer",
        "Graphic Designer",
        "Team Lead",
        "Administrator",
      ],
    },
    capabilities: {
      type: [String],
      required: true,
      default: function () {
        switch (this.role) {
          case "Administrator":
            return ["read", "create", "update", "delete"];
          case "Team Lead":
            return ["read", "create", "update"];
          case "Software Developer":
          case "Graphic Designer":
            return ["read"];
          default:
            return [];
        }
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
