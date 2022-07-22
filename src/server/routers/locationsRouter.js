require("dotenv").config();
const express = require("express");
const {
  getUserLocations,
  deleteLocations,
} = require("../controllers/locationControllers");
const auth = require("../middlewares/auth");

const locationsRouter = express.Router();

locationsRouter.get("/marks", auth, getUserLocations);

locationsRouter.delete("/delete/:locationId", auth, deleteLocations);

module.exports = locationsRouter;
