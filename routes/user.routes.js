const express = require('express');
const UserAuthController = require('../controllers/user_auth.controller');
const UserController = require('../controllers/user.controller');
const { checkPermissions } = require('../middlewares/checkPermissions.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const AdminAuthController = require('../controllers/admin_auth.controller');

const router = express.Router();
var multer = require('multer')
var multParse = multer()


router.post('/register' , multParse.any(),  UserAuthController.register);
router.post('/login', UserAuthController.login);
router.get('/logout', AdminAuthController.logout);
router.post('/forget' , UserAuthController.forgetPassword);
router.post('/updatePassword' , UserAuthController.updatePassword);
router.post('/approve' , AuthMiddleware() ,
  checkRole(['SUPER_ADMIN' , 'ADMIN']),
  UserController.approveUser);
// User Management Operations
router.get('/' ,
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