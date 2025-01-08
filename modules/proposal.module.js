const proposalRoutes = require('../routes/proposal.routes');
const { Router } = require('express');

const proposalModule = () => {
  const router = Router();
  router.use('/proposals', proposalRoutes);
  return router;
}

module.exports = proposalModule;
