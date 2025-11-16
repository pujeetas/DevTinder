const mongoose = require("mongoose");
const User = require("../models/user");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pujeeta98_db_user:pujeeta98%40gmail@cluster0.b3ooqbq.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
