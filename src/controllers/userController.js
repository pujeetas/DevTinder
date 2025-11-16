const express = require("express");

const {
  userSignUpValidation,
  userUpdateValidation,
} = require("../validations/userValidation");

const app = express();
const user = require("../models/user");
const mongoose = require("mongoose");

const connectDB = require("../config/database");
const User = require("../models/user");

app.use(express.json());

connectDB()
  .then(() => {
    console.log("Database Connection Establised");
    console.log("Connected to DB:", mongoose.connection.name); // <— IMPORTANT

    app.listen(3000, () => {
      console.log("Hello 3000");
    });
  })
  .catch((err) => {
    console.log("Failed to Connect to DB", err);
  });

//signUp new user
const signUp = async (req, res) => {
  const { error, value } = userSignUpValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

  const userObj = new User(value);
  try {
    await userObj.save();
    res.send("User Registered");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//get user by email
const getUser = async (req, res) => {
  const userEmail = req.params.email;
  try {
    const getUserByEmail = await User.find({ email: userEmail });
    if (getUserByEmail.length === 0) {
      return res.status(400).send("No email found");
    }
    res.send(getUserByEmail);
  } catch (err) {
    res.status(400).send("Error finding user", err);
  }
};

//get all user
const getAllUser = async (req, res) => {
  const allUser = await User.find({});
  try {
    res.send(allUser);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
};

//delete user by ID
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    res.send("User was deleted");
  } catch (err) {
    res.status(400).send("Something went wrong", err);
  }
};

// //update user
const updateUser = async (req, res) => {
  const id = req.params?.id;
  const field = req.body;

  const { error, value } = userUpdateValidation.validate(field);

  if (error) {
    return res.status(400).send(error.message);
  }

  try {
    const allowed = ["age", "gender", "skills"];
    const updatedUser = await User.findByIdAndUpdate(id, value, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send("Something went wrong: ", err.message);
  }
};

module.exports = { signUp, getUser, getAllUser, deleteUser, updateUser };
