const express = require("express");

const app = express();
const mongoose = require("mongoose");

const connectDB = require("./config/database");

const userController = require("../src/controllers/userController");

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
app.post("/signUp", userController.signUp);

//get user by email
app.get("/getUser/:email", userController.getUser);

//get all user
app.get("/getAllUser", userController.getAllUser);

//delete user by ID
app.delete("/deleteUser/:id", userController.deleteUser);

//update user
app.patch("/updateUser/:id", userController.updateUser);
