const User = require("../models/User");
const logger = require("../utils/logger");

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    logger.error(`Error getting all users: ${e.message}`);
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    logger.error(`Error getting user by ID: ${e.message}`);
    next(e);
  }
};

// Update user
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (e) {
    logger.error(`Error updating user: ${e.message}`);
    next(e);
  }
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    logger.error(`Error deleting user: ${e.message}`);
    next(e);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
