"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const User = require("./User");

require("dotenv").config();
const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite::memory" : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const usersModel = User(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  usersModel,
};
