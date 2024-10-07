const express = require('express');
const pageRoutes = require('../routes/page.routes'); // Import your page routes
const router = express.Router();

const pageModule = () => {
  router.use('/pages', pageRoutes.router);
  return router;
};

module.exports = pageModule;
