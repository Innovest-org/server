const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const adminModule = require('./modules/admin.module');
const userModule = require('./modules/user.module');
const pageModule = require('./modules/page.module');
const communityModule = require("./modules/community.module");
const notificationModule =require("./modules/notification.module")
const { dbConection } = require("./config/db");
const bodyParser = require('body-parser');
const http = require('http');
const socketConfig = require('./config/socket'); // renamed to avoid confusion

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketConfig.init(server); // Initialize Socket.IO with the server

dbConection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());

// Routes
app.use('/api', adminModule());
app.use('/api', communityModule());
app.use('/api', userModule());
app.use('/api', pageModule());
app.use('/notifications', notificationModule());

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinCommunity', (communityId) => {
    console.log(`Client joined community: ${communityId}`);
    socket.join(communityId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
