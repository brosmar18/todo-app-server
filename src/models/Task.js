"use strict";

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },
  },
  { timestamps: true }
);

taskSchema.pre("find", function (next) {
  this.populate("assignee", "firstName lastName");
  next();
});

taskSchema.pre("findOne", function (next) {
  this.populate("assignee", "firstName lastName");
  next();
});

module.exports = mongoose.model("Task", taskSchema);
