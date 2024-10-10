const express = require('express');
const pageRoutes = require('../routes/page.routes');
const router = express.Router();

const pageModule = () => {
  router.use('/community', pageRoutes);
  return router;
};

module.exports = pageModule;
