const mongoose = require("mongoose");

const resourcesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Ensures the 'name' field is required
      unique: true, // Ensures the 'name' field values are unique
      minlength: [2, "Name should be at least 2 characters"], // Minimum length for the 'name'
      maxlength: [25, "Name cannot exceed 25 characters"], // Maximum length for the 'name'
      validate: {
        validator: (value) => /^[a-zA-Z]+$/.test(value), // Ensures the 'name' field contains only alphabetical characters
        message: "Please enter a valid string for the name.",
      },
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    officialEmail: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    mobileNo: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^\d{10}$/.test(value),
        message: "Mobile number should be a 10-digit number.",
      },
    },
    otherMobileNo: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^\d{10}$/.test(value),
        message: "Mobile number should be a 10-digit number.",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])(?=.*[A-Z])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            value
          ),
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    technology: {
      type: String,
      required: true,
      match: /^[a-zA-Z]+$/,
      message:
        "Technology must be a string containing only alphabetical characters.",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("resources", resourcesSchema);
