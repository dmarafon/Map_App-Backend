const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({
  placename: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  todo: {
    type: String,
    required: true,
  },
});

const Location = model("Location", LocationSchema, "locations");

module.exports = Location;
