const express = require('express');
const AdminController  = require('../controllers/admin.controller');
const roleMiddleware = require('../middlewares/role.middleware');
const AdminAuthController = require('../controllers/auth.controller');
const { checkPermissions } = require('../middlewares/checkPermissions.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

//don't forget to add middlewares after auth finished 
router.post('/', AuthMiddleware() ,  AdminController.create);
router.put('/:id', AdminController.update);
router.delete('/:id', roleMiddleware(['SUPER_ADMIN']), AdminController.delete);
router.get('/', AdminController.list);
router.get('/:id', AdminController.getById);
router.post('/login', AdminAuthController.login);

// will be deleted 
//router.get('/test', AuthController.test);

module.exports = router;
