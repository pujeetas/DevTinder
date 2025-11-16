const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
    },
    skills: [String],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
