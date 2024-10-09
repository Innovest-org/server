const { Router } = require('express');
const projectRoutes = require('../routes/project.routes');


const projectModule = () => {
  const router = Router();
  router.use('/projects', projectRoutes);
  return router;
};


module.exports = projectModule;
