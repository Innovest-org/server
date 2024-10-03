const express = require('express');
const CommunityController = require('../controllers/community.controller');
const { checkOwnership } = require('../middlewares/checkOwnership.middleware');
const { checkPermissions } = require('../middlewares/checkPermissions.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const router = express.Router();

// Route to create a new community
router.post('/',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  checkPermissions(['CREATE_COMMUNITY']),
  CommunityController.createCommunity);

// Route to update an existing community
router.put('/:community_id',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  checkPermissions(['UPDATE_COMMUNITY']),
  CommunityController.updateCommunity);

// Route to delete a community
router.delete('/:community_id',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  checkPermissions(['DELETE_COMMUNITY']),
  CommunityController.deleteCommunity);

// Route to get community by its name
router.get('/name/:community_name',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  checkPermissions(['VIEW_COMMUNITY']),
  CommunityController.getCommunityByName);

// Route to get a community by its id
router.get('/:community_id',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  checkPermissions(['VIEW_COMMUNITY']),
  CommunityController.getCommunityById);

// Route to get all communities
router.get('/',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  checkPermissions(['VIEW_COMMUNITY']),
  CommunityController.getAllCommunities);

module.exports = router;
