"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const basicAuth = require("../middleware/auth/basicAuth");
const { userModel } = require("../models");
const logger = require("../Utils/logger");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { firstName, lastName, occupation, email, username, password } =
      req.body;
    const encryptedPassword = await bcrypt.hash(password, 10); 
    let newUser = await userModel.create({
      firstName,
      lastName,
      occupation,
      email, 
      username,
      password: encryptedPassword,
    });
    res.status(201).send(newUser);
  } catch (e) {
    logger.error(`Signup error: ${e.message}`);
    res.status(500).send("Server Error - Unable to create user");
  }
});

router.post("/signin", basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports = router;
