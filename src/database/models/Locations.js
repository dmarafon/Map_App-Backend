const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
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

const Location = model("Location", UserSchema, "locations");

module.exports = Location;
