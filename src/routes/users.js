const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

// Get all users
router.get("/users", verifyToken, getAllUsers);

// Get user by ID
router.get("/users/:id", verifyToken, getUserById);

// Update user
router.put("/users/:id", verifyToken, updateUser);

// Delete user
router.delete("/users/:id", verifyToken, deleteUser);

module.exports = router;
