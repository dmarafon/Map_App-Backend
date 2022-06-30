require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const { getUserLocations } = require("../controllers/locationControllers");
const auth = require("../../server/middlewares/auth");

const LocationsRouter = express.Router();

const upload = multer({
  // eslint-disable-next-line new-cap
  storage: new multer.diskStorage({
    destination: path.join("uploads", "artimages"),
  }),
  limits: {
    fileSize: 8000000,
  },
});

LocationsRouter.get("/myart", auth, getPaginatedMyArtworks);

module.exports = locationsRouter;
