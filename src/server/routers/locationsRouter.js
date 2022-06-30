require("dotenv").config();
const express = require("express");
const { getUserLocations } = require("../controllers/locationControllers");
const auth = require("../middlewares/auth");

const locationsRouter = express.Router();

locationsRouter.get("/locations", auth, getUserLocations);

module.exports = locationsRouter;
