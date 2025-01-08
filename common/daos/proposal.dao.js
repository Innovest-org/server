const {Proposal, ProposalRecipient} = require('../../db/models/proposal.model');

const ProposalDAO = {
  
  async createProposal(proposalData, entrepreneurId) {
    console.log('proposal', proposalData);
    try {
      const proposal = new Proposal({ ...proposalData, entrepreneur_id: entrepreneurId });
      return await proposal.save();
    } catch (error) {
      console.log('Error creating proposal: ' + error);
      throw new Error('Unable to create proposal');
    }
  },

  async getProposalByEntrepreneur(entrepreneurId, pagination = {}) {
    try {
      const { page = 1, limit = 10 } = pagination;
      const skip = (page - 1) * limit;
      const totalItems = await Proposal.countDocuments({ entrepreneur_id: entrepreneurId });
      const proposals = await Proposal.find({ entrepreneur_id: entrepreneurId })
      .skip(skip)
      .limit(limit);
      return {
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        proposals,
      };
    } catch (error) {
      console.error(
        `Error in getProposalsByEntrepreneur DAO for entrepreneurId: ${entrepreneurId}`,
        error
      );
      throw new Error('Unable to get proposal');
    }
  },

  // async getProposalByProjects(projectId, pagination = {}) {
  //   try {
  //     const { page = 1, limit = 10 } = pagination;
  //     const skip = (page - 1) * limit;
  //     const totalItems = await Proposal.countDocuments({ project_id: projectId });
  //     const proposals = await Proposal.find({ project_id: projectId })
  //     .skip(skip)
  //     .limit(limit);

  //     return {
  //       totalItems,
  //       currentPage: page,
  //       totalPages: Math.ceil(totalItems / limit),
  //       proposals,
  //     }
  //   } catch (error) {
  //     console.log('Error getting proposal: ' + error);
  //     throw new Error('Unable to get proposal');
  //   }
  // },

  async getProposalById(proposalId) {
    try {
      return await Proposal.findOne({ proposal_id: proposalId });
    } catch (error) {
      console.log('Error getting proposal: ' + error);
      throw new Error('Unable to get proposal');
    }
  },

  async sendProposal(proposalId, investorId) {
    try {
      const recipient = await ProposalRecipient.create({ proposal_id: proposalId, investor_id: investorId });
      return recipient.save();
      
    } catch (error) {
      res.status(500).json({ message: 'Error sending proposal' });
    }
  },

  async updateProposal(proposalId, updateData) {
    try {
      return await Proposal.findOneAndUpdate(
        { proposal_id: proposalId },
        { $set: updateData },
        { new: true },
      );
    } catch (error) {
      console.log('Error updating proposal: ' + error);
      throw new Error('Unable to update proposal');
    }
  },

  async updateProposalStatus(proposalId, status) {
    try {
      return await Proposal.findOneAndUpdate(
        { proposal_id: proposalId },
        { $set: { status: status } },
        { new: true, runValidators: true },
      );
    } catch (error) {
      console.log('Error updating proposal status: ' + error);
      throw new Error('Unable to update proposal status');
    }
  },

  async deleteProposal(proposalId) {
    try {
      return await Proposal.findOneAndDelete({ proposal_id: proposalId });
    } catch (error) {
      console.log('Error deleting proposal: ' + error);
      throw new Error('Unable to delete proposal');
    }
  },
};

module.exports = ProposalDAO;
