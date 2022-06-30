const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  properties: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  geometry: {
    type: {
      type: String,
      required: true,
    },
    coordinates: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  collection: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Location = model("Location", LocationSchema, "locations");

module.exports = Location;
