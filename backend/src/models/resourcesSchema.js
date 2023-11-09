const mongoose = require("mongoose");

const resourcesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  officialEmail: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  mobileNo: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Please enter a 10-digit mobile number.`,
    },
  },
  otherMobileNo: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Please enter a 10-digit mobile number.`,
    },
  },
  password: { type: String, required: true },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("resources", resourcesSchema);