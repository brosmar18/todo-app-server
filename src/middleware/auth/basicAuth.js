"use strict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { userModel } = require("../../models");
const logger = require("../../Utils/logger");

const basicAuth = async (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization) {
    logger.warn("No authorization header provided"); // Log warning
    res.status(401).send("No authorization header provided");
    return;
  }

  let authString = authorization.split(" ")[1];
  let decodedAuthString = base64.decode(authString);
  let [username, password] = decodedAuthString.split(":");
  logger.debug(`Attempting authentication for user: ${username}`); // Log attempt

  let user = await userModel.findOne({ where: { username } });

  if (user) {
    let validUser = await bcrypt.compare(password, user.password);
    if (validUser) {
      logger.info(`User authenticated successfully: ${username}`); // Log success
      req.user = user;
      next();
    } else {
      logger.warn(
        `Authentication failed for user: ${username} - Incorrect password`
      ); // Log failed attempt
      res.status(403).send("Not Authorized (password incorrect)");
    }
  } else {
    logger.warn(
      `Authentication failed for user: ${username} - User does not exist`
    ); // Log user not found
    res.status(403).send("Not Authorized (user doesn't exist in DB)");
  }
};

module.exports = basicAuth;
