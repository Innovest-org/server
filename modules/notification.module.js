const { Router } = require('express');
const notificationRoutes = require("./routes/notification.routes")


const notificationModule = () => {
  const router = Router();
  router.use('/notifications', notificationRoutes);
  return router;
};


module.exports = notificationModule;
