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


// db.js

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Innovest', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
