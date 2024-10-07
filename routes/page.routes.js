const express = require('express');
const pageController = require('../controllers/page.controller');
const { checkPermissions } = require('../middlewares/checkPermissions.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const { checkOwnership } = require('../middlewares/checkOwnership.middleware');

const router = express.Router();

let io; // Declare the Socket.IO instance

// Route to create a new page
router.post('/',
  AuthMiddleware(),
  checkPermissions(['CREATE_PAGE']),
  (req, res) => pageController(io).createPage(req, res)
);

// Route to update an existing page
router.put('/:page_id',
  AuthMiddleware(),
  checkPermissions(['UPDATE_PAGE']),
  (req, res) => pageController(io).updatePage(req, res)
);

// Route to delete a page
router.delete('/:page_id',
  AuthMiddleware(),
  checkPermissions(['DELETE_PAGE']),
  (req, res) => pageController(io).deletePage(req, res)
);

// Route to get a page by id
router.get('/:page_id',
  AuthMiddleware(),
  checkPermissions(['VIEW_PAGE']),
  (req, res) => pageController(io).getPageById(req, res)
);

// Route to get all pages
router.get('/',
  AuthMiddleware(),
  checkPermissions(['VIEW_PAGE']),
  (req, res) => pageController(io).getAllPages(req, res)
);

// Route to get all pending pages
router.get('/pending',
  AuthMiddleware(),
  checkPermissions(['VIEW_PAGE']),
  (req, res) => pageController(io).getPendingPages(req, res)
);

// Route to add a page to pending pages
router.post('/:page_id/pending',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', 'ADMIN']),
  checkPermissions(['PENDING_PAGE']),
  (req, res) => pageController(io).addPageToPending(req, res)
);

// Route to approve a page
router.post('/:page_id/approve',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', 'ADMIN']),
  checkPermissions(['APPROVE_PAGE']),
  (req, res) => pageController(io).approvePageToAddCommunity(req, res)
);

// Route to reject a page
router.delete('/:page_id/reject',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', 'ADMIN']),
  checkPermissions(['REJECT_PAGE']),
  (req, res) => pageController(io).rejectPageToAddCommunity(req, res)
);

// Route to remove a page from a community
router.delete('/:page_id/remove',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', 'ADMIN']),
  checkPermissions(['REMOVE_PAGE']),
  (req, res) => pageController(io).removePageFromCommunity(req, res)
);

module.exports = {
  router,
  setIoInstance: (socketIo) => {
    io = socketIo; // Set the Socket.IO instance
  }
};
