const { Router } = require('express');
const userRoutes = require('../routes/userRouter');

const userModule = () => {
  const router = Router();
  router.use('/users', userRoutes);
  return router;
};

module.exports = userModule;
