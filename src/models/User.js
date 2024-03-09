"use strict";

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
