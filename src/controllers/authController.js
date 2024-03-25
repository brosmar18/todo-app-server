const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../utils/logger");

// Register logic
const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use. " });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      firstName,
      lastName,
      role,
    });

    const savedUser = await newUser.save();
    logger.info(`New user registered: ${email}`);
    res.status(201).json(savedUser);
  } catch (e) {
    logger.error(`Registration error: ${e.message}`);
    next(e);
  }
};

// Login Logic
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      logger.warn(`Login attempt for non-existent user: ${email}`);
      return res.status(400).json({ message: "User does not exist." });
    }

    const userMatch = await bcrypt.compare(password, user.password);
    if (!userMatch) {
      logger.warn(`Invalid login attempt for user: ${email}`);
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    logger.info(`User logged in: ${email}`);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (e) {
    logger.error(`Registration error: ${e.message}`);
    next(e);
  }
};

module.exports = { register, login };
