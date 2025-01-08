const express = require('express');
const ProposalController = require('../controllers/proposal.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// Create a new proposal
router.post('/',
  AuthMiddleware(),
  ProposalController.createProposal);

// Get proposals by entrepreneur
router.get('/',
  AuthMiddleware(),
  ProposalController.getProposalsByEntrepreneur);

// Get proposal by id
router.get('/:proposal_id',
  AuthMiddleware(),
  ProposalController.getProposalById);

module.exports = router;
