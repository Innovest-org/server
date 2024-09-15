const mongoose = require("mongoose");
require("dotenv").config();

async function dbConection() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // No need for deprecated options anymore
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = {
  dbConection,
};
