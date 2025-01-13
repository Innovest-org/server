const ProposalDAO = require('../common/daos/proposal.dao');

class ProposalService {
  async createProposal(proposalData, entrepreneurId) {
    try {
      return await ProposalDAO.createProposal(proposalData, entrepreneurId);
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  }

  async getProposalsByEntrepreneur(entrepreneurId, pagination) {
    try {
      return await ProposalDAO.getProposalByEntrepreneur(entrepreneurId, pagination);
    } catch (error) {
      console.error('Error fetching proposals by entrepreneur:', error);
      throw error;
    }
  }

  // async getProposalsByProjects(projectId, pagination) {
  //   try {
  //     return await ProposalDAO.getProposalsByProjects(projectId);
  //   } catch (error) {
  //     console.error('Error fetching proposals by project:', error);
  //     throw error;
  //   }
  // }

  async sendProposalToInvestors(proposalId, investorIds) {
    try {
      return await ProposalDAO.sendProposalToInvestors(proposalId, investorIds);
    } catch (error) {
      console.error('Error sending proposal to investors:', error);
      throw error;
    }
  }

  async getProposalById(proposalId) {
    try {
      return await ProposalDAO.getProposalById(proposalId);
    } catch (error) {
      console.error('Error fetching proposal by ID:', error);
      throw error;
    }
  }

  async updateProposal(proposalId, updateData) {
    try {
      return await ProposalDAO.updateProposal(proposalId, updateData);
    } catch (error) {
      console.error('Error updating proposal:', error);
      throw error;
    }
  }

  async updateProposalStatus(proposalId, status) {
    try {
      return await ProposalDAO.updateProposalStatus(proposalId, status);
    } catch (error) {
      console.error('Error updating proposal status:', error);
      throw error;
    }
  }

  async deleteProposal(proposalId) {
    try {
      return await ProposalDAO.deleteProposal(proposalId);
    } catch (error) {
      console.error('Error deleting proposal:', error);
      throw error;
    }
  }
}

module.exports = new ProposalService();
