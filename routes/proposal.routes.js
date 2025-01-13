const express = require('express');
const ProposalController = require('../controllers/proposal.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
const { body } = require('express-validator');  // Import body from express-validator

// Create a new proposal
router.post('/',
  AuthMiddleware(),
  ProposalController.createProposal);

// Get proposals by investor
router.get('/investor_proposals',
  AuthMiddleware(),
  ProposalController.getProposalsForInvestor);

// Get proposals by entrepreneur
router.get('/',
  AuthMiddleware(),
  ProposalController.getProposalsByEntrepreneur);

// Get proposal by id
router.get('/:proposal_id',
  AuthMiddleware(),
  ProposalController.getProposalById);

router.post('/:proposal_id/send_to_investors',
  AuthMiddleware(),
  body('investor_ids').exists().withMessage('Investor ids are required'),
  ProposalController.sendProposalToInvestors);



module.exports = router;
