const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const adminModule = require('./modules/admin.module');
const pageModule = require('./modules/page.module');
const userModule = require('./modules/user.module');
const communityModule = require("./modules/community.module");
const { dbConection } = require("./config/db");
const http = require('http');
const { init } = require('./config/socket');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

dbConection();

// Socket.io connection
const server = http.createServer(app);
const io = init(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cookie-parser')());


// Routes
app.use('/api', adminModule());
app.use('/api', communityModule());
app.use('/api' , userModule());

// Set up page routes after `io` is initialized
const { router: pageRouter, setIoInstance } = require('./routes/page.routes');
setIoInstance(io);
app.use('/api/pages', pageRouter);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

// Setup Socket.IO events
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
