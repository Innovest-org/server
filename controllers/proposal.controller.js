const ProposalService = require('../services/proposal.service');
const { validationResult } = require('express-validator');
const ProposalDTO = require('../common/dtos/proposal.dto');

class ProposalController {
  async createProposal(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, project_id, amount, milestones, benefits, terms } = req.body;
      const entrepreneur_id = req.user.id;

      const proposalData = ProposalDTO.fromRequest({
        title,
        project_id,
        amount,
        milestones,
        benefits,
        terms
      });

      const proposal = await ProposalService.createProposal(proposalData, entrepreneur_id);

      res.status(201).json(ProposalDTO.toResponse(proposal));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async getProposalsByEntrepreneur(req, res) {
    try {
      const entrepreneur_id = req.user.id;
      const pagination = JSON.parse(req.query.pagination || '{}');
      console.log('entrepreneur_id:', entrepreneur_id);
      console.log('pagination:', pagination);
  
      const result = await ProposalService.getProposalsByEntrepreneur(entrepreneur_id, pagination);

      if (!result.proposals.length) {
        return res.status(404).json({ message: 'Proposals not found' });
      }
  
      res.status(200).json({
        totalItems: result.totalItems,
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        limit: pagination.limit || 10,
        proposals: result.proposals.map(proposal => ProposalDTO.toResponse(proposal)),
        
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async getProposalById(req, res) {
    try {
      const {proposal_id} = req.params;
      const proposal = await ProposalService.getProposalById(proposal_id);
      if (!proposal) {
        return res.status(404).json({ message: 'Proposal not found' });
      }
      res.status(200).json(ProposalDTO.toResponse(proposal));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async sendProposalToInvestors(req, res) {
    try {
      const { proposal_id } = req.params;
      const {investor_ids} = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const investorsToSend = Array.isArray(investor_ids) ? investor_ids : [investor_ids];

      await ProposalService.sendProposalToInvestors(proposal_id, investorsToSend);

      res.status(200).json({ message: 'Proposal sent to investors successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
}

module.exports = new ProposalController();
