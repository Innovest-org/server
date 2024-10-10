const express = require('express');
const router = express.Router();
const PageController = require('../controllers/page.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const { checkPermissions } = require('../middlewares/checkPermissions.middleware');
const checkRole = require('../middlewares/role.middleware');

// Route to get all pending pages
router.get('/pending',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  PageController.getPendingPages);

module.exports = router;
