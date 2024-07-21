const mongoose = require("mongoose");

const Registerdata = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Registerdata", Registerdata);
