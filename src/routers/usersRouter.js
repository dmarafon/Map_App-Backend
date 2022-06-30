require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const credentialsLoginSchema = require("../utils/schemas/userCredentialsSchema");

const usersRouter = express.Router();

usersRouter.post("/login", validate(credentialsLoginSchema), loginUser);

module.exports = usersRouter;
