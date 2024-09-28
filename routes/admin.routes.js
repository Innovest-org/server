const express = require('express');
const AdminController = require('../controllers/admin.controller');
const roleMiddleware = require('../middlewares/role.middleware');
const { checkPermissions } = require('../middlewares/checkPermissions.middleware');

const router = express.Router();

//don't forget to add middlewares after auth finished 
router.post('/',  AdminController.create);
router.put('/:id', AdminController.update);
router.delete('/:id', roleMiddleware(['SUPER_ADMIN']), AdminController.delete);
router.get('/', AdminController.list);
router.get('/:id', AdminController.getById);

module.exports = router;
