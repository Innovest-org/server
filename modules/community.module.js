const { Router } = require('express');
const communityRoute = require('../routes/community.routes')

const communityModule = () => {
  const router = Router();
  router.use('/community', communityRoute);
  return router;
};

module.exports = communityModule;
