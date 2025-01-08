const ProposalDAO = require('../common/daos/proposal.dao');


class ProposalService {
  async createProposal(proposalData, entrepreneurId) {
    return await ProposalDAO.createProposal(proposalData, entrepreneurId);
  }

  async getProposalsByEntrepreneur(entrepreneurId, pagination) {
    return ProposalDAO.getProposalByEntrepreneur(entrepreneurId);
  }

  // async getProposalsByProjects(projectId, pagination) {
  //   return ProposalDAO.getProposalsByProjects(projectId);
  // }

  async getProposalById(proposalId) {
    return ProposalDAO.getProposalById(proposalId);
  }


  async updateProposal(proposalId, updateData) {
    return await ProposalDAO.updateProposal(proposalId, updateData);
  }

  async updateProposalStatus(proposalId, status) {
    return await ProposalDAO.updateProposalStatus(proposalId, status);
  }

  async deleteProposal(proposalId) {
    return await ProposalDAO.deleteProposal(proposalId);
  }
};

module.exports = new ProposalService();
