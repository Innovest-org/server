const express = require('express');
const router = express.Router();
const PageController = require('../controllers/page.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const { checkPermissions } = require('../middlewares/checkPermissions.middleware');
const checkRole = require('../middlewares/role.middleware');


// Route to create a page

// Route to update a page
router.put('/:pageId',
  AuthMiddleware(),
  checkPermissions(['UPDATE_PAGE']),
  PageController.updatePage);

// Route to delete a page
router.delete('/:pageId',
  AuthMiddleware(),
  checkPermissions(['DELETE_PAGE']), 
  PageController.deletePage);

// Route to get a page by ID
router.get('/:pageId',
  AuthMiddleware(),
  checkPermissions(['VIEW_PAGE']),
  PageController.getPageById);

// Route to get all pending pages
router.get('/pending',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  PageController.getPendingPages);



module.exports = router;
