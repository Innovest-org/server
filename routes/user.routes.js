const express = require('express');
const UserAuthController = require('../controllers/user_auth.controller');
const UserController = require('../controllers/user.controller');
const { checkPermissions } = require('../middlewares/checkPermissions.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const Verify = require('../middlewares/verify.middleware');
const router = express.Router();
var multer = require('multer');
var multParse = multer()

router.post('/register', multParse.any(), UserAuthController.register);
router.post('/login', UserAuthController.login);
router.get('/pending-users',
  AuthMiddleware(),
  UserAuthController.getPendingUsers);
router.put('/approve-user/:user_id',
  AuthMiddleware(),
  UserAuthController.approveUser
);

router.put('/reject-user/:user_id',
  AuthMiddleware(),
  UserAuthController.rejectUser);

router.post('/forgot-password',
  AuthMiddleware(),
  UserAuthController.forgotPassword);

router.post('/reset-password',
  UserAuthController.resetPassword);

// User Management Operations
router.get('/search',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN", 'ENTREPRENEUR', 'INVESTOR']),
  checkPermissions(['VIEW_USER']),
  UserController.searchUsers);

router.get('/',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN", 'ENTREPRENEUR', 'INVESTOR']),
  checkPermissions(['VIEW_USER']),
  UserController.getUsers);

router.get('/:id',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN", 'ENTREPRENEUR', 'INVESTOR']),
  checkPermissions(['VIEW_USER']),
  UserController.getUserById);

router.delete('/:id',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN", 'ENTREPRENEUR', 'INVESTOR']),
  checkPermissions(['DELETE_USER']),
  UserController.deleteUser);

router.put('/:id',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN", 'ENTREPRENEUR', 'INVESTOR']),
  checkPermissions(['UPDATE_USER']),
  UserController.updateUser);

module.exports = router;