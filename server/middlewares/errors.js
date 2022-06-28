require("dotenv").config();
const debug = require("debug")("map-project:server:middlewares:errors");
const chalk = require("chalk");
const { ValidationError } = require("express-validation");
const customError = require("../../utils/customError");

const notFoundError = (req, res, next) => {
  const error = customError(404, "Endpoint not found");

  next(error);
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  debug(chalk.red(error.message || error.customMessage));
  const message = error.customMessage ?? "General Error";
  const statusCode = error.statusCode ?? 500;

  if (error instanceof ValidationError) {
    res.status(400).json({ message: "Bad Request" });
    debug(chalk.bgRedBright(error.message));
  } else {
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  notFoundError,
  generalError,
};
