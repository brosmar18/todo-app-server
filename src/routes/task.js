const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { verifyToken } = require("../middleware/verifyToken");

// Create a new task
router.post("/api/task", verifyToken, taskController.createTask);

// Get all tasks
router.get("/api/tasks", verifyToken, taskController.getAllTasks);

// Get a single task by ID
router.get("/api/task/:id", verifyToken, taskController.getTaskById);

// Update a task
router.put("/api/task/:id", verifyToken, taskController.updateTask);

// Delete a task
router.delete("/api/task/:id", verifyToken, taskController.deleteTask);

module.exports = router;
