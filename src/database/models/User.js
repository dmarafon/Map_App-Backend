const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  apartmentdoorstair: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
