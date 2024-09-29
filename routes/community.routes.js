const express = require('express');
const CommunityController = require('../controllers/community.controller');
const router = express.Router();

// Middleware to check if user is authenticated can be added here

// Route to create a new community
router.post('/', CommunityController.createCommunity);

// Route to update an existing community
router.put('/:community_name', CommunityController.updateCommunity);

// Route to delete a community
router.delete('/:community_name', CommunityController.deleteCommunity);

// Route to get a community by its name
router.get('/:community_name', CommunityController.getCommunityById);

// Route to get all communities
router.get('/', CommunityController.getAllCommunities);

module.exports = router;
