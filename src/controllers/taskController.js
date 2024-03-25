const Task = require("../models/Task");
const logger = require("../utils/logger");

const createTask = async (req, res, next) => {
  try {
    const { taskName, description, assignee, difficulty } = req.body;
    const createdBy = req.user._id;

    // Check if the user has the 'create' capability
    if (!req.user.capabilities.includes("create")) {
      logger.warn(
        `User ${req.user._id} attempted to create a task without permission`
      );
      return res.status(403).json({
        error: "Access denied. You don't have permission to create tasks.",
      });
    }

    const task = new Task({
      taskName,
      description,
      createdBy,
      assignee,
      difficulty,
    });

    const savedTask = await task.save();
    logger.info(`Task ${savedTask._id} created by user ${req.user._id}`);
    res.status(201).json(savedTask);
  } catch (error) {
    logger.error(`Error creating task: ${error.message}`);
    next(error);
  }
};
// Get all tasks
const getAllTasks = async (req, res, next) => {
  try {
    let tasks;
    if (req.user.role === "Administrator" || req.user.role === "Team Lead") {
      // Administrators and Team Leads can get all tasks
      tasks = await Task.find().populate(
        "createdBy assignee",
        "firstName lastName email"
      );
    } else {
      // Software Developers and Graphic Designers can only get tasks assigned to them
      tasks = await Task.find({ assignee: req.user._id }).populate(
        "createdBy assignee",
        "firstName lastName email"
      );
    }
    logger.info(`User ${req.user._id} retrieved all tasks`);
    res.status(200).json(tasks);
  } catch (error) {
    logger.error(`Error retrieving tasks: ${error.message}`);
    next(error);
  }
};

// Get a single task by ID
const getTaskById = async (req, res, next) => {
  try {
    let task;
    if (req.user.role === "Administrator" || req.user.role === "Team Lead") {
      // Administrators and Team Leads can get any task by ID
      task = await Task.findById(req.params.id).populate(
        "createdBy assignee",
        "firstName lastName email"
      );
    } else {
      // Software Developers and Graphic Designers can only get tasks assigned to them
      task = await Task.findOne({
        _id: req.params.id,
        assignee: req.user._id,
      }).populate("createdBy assignee", "firstName lastName email");
    }
    if (!task) {
      logger.warn(
        `User ${req.user._id} attempted to retrieve non-existent task ${req.params.id}`
      );
      return res.status(404).json({ error: "Task not found" });
    }
    logger.info(`User ${req.user._id} retrieved task ${task._id}`);
    res.status(200).json(task);
  } catch (error) {
    logger.error(`Error retrieving task: ${error.message}`);
    next(error);
  }
};

// Update a task
const updateTask = async (req, res, next) => {
  try {
    const { taskName, description, assigneeId, difficulty } = req.body;

    // Check if the user has the 'update' capability
    if (!req.user.capabilities.includes("update")) {
      logger.warn(
        `User ${req.user._id} attempted to update a task without permission`
      );
      return res.status(403).json({
        error: "Access denied. You don't have permission to update tasks.",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { taskName, description, assignee: assigneeId, difficulty },
      { new: true }
    ).populate("createdBy assignee", "firstName lastName email");

    if (!updatedTask) {
      logger.warn(
        `User ${req.user._id} attempted to update non-existent task ${req.params.id}`
      );
      return res.status(404).json({ error: "Task not found" });
    }

    logger.info(`User ${req.user._id} updated task ${updatedTask._id}`);
    res.status(200).json(updatedTask);
  } catch (error) {
    logger.error(`Error updating task: ${error.message}`);
    next(error);
  }
};

// Delete a task
const deleteTask = async (req, res, next) => {
  try {
    // Check if the user has the 'delete' capability
    if (!req.user.capabilities.includes("delete")) {
      logger.warn(
        `User ${req.user._id} attempted to delete a task without permission`
      );
      return res.status(403).json({
        error: "Access denied. You don't have permission to delete tasks.",
      });
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      logger.warn(
        `User ${req.user._id} attempted to delete non-existent task ${req.params.id}`
      );
      return res.status(404).json({ error: "Task not found" });
    }
    logger.info(`User ${req.user._id} deleted task ${deletedTask._id}`);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting task: ${error.message}`);
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
