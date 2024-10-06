const express = require('express');
const CommunityController = require('../controllers/community.controller');
const { checkPermissions } = require('../middlewares/checkPermissions.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');
const checkRole = require('../middlewares/role.middleware');
const { checkOwnership } = require('../middlewares/checkOwnership.middleware');
const Community = require('../db/models/communityModel');
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
  checkPermissions(['VIEW_COMMUNITY']),
  CommunityController.getAllCommunities);

// Route to allow a user to join a community
router.post('/:community_id/join',
  AuthMiddleware(),
  checkPermissions(['JOIN_COMMUNITY']),
  CommunityController.addUserToPendingUsers);

// Route to approve a user to join a community
router.post('/:community_id/approve-user/:user_id',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  checkPermissions(['APPROVE_USER']),
  CommunityController.approveUserToJoinCommunity);

// Route to reject a user from joining a community
router.delete('/:community_id/reject-user/:user_id',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  checkPermissions(['REJECT_USER']),
  CommunityController.rejectUserToJoinCommunity);

// Route to remove a user from a community
router.delete('/:community_id/users/:user_id',
  AuthMiddleware(),
  checkRole(['SUPER_ADMIN', "ADMIN"]),
  checkPermissions(['REMOVE_USER_FROM_COMMUNITY']),
  CommunityController.removeUserFromCommunity
);

// Route to get users of a community
router.get('/:communityId/users',
  AuthMiddleware(),
  CommunityController.getCommunityUsers
);

module.exports = router;
