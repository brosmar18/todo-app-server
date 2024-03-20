const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { verifyToken } = require("../middleware/verifyToken");

// Create a new task
router.post("/", verifyToken, taskController.createTask);

// Get all tasks
router.get("/", verifyToken, taskController.getAllTasks);

// Get a single task by ID
router.get("/:id", verifyToken, taskController.getTaskById);

// Update a task
router.put("/:id", verifyToken, taskController.updateTask);

// Delete a task
router.delete("/:id", verifyToken, taskController.deleteTask);

module.exports = router;
