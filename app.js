const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const adminModule = require('./modules/admin.module');
const communityModule = require("./modules/community.module");
const { dbConection } = require("./config/db");


dotenv.config();
const app = express();

dbConection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api', adminModule());

app.use('/api', communityModule());

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);



