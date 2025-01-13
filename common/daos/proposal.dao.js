const {Proposal, ProposalRecipient} = require('../../db/models/proposal.model');
const { PROPOSAL_RECIPIENT_STATUS } = require('../../db/models/constants');
const {User} = require('../../db/models/userModel');
const {sendEmail} = require('../../utils/email.utils');  

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


  async sendProposalToInvestors(proposal_id, investor_ids) {
    try {
      const proposal = await Proposal.findOne({proposal_id :proposal_id});
      if (!proposal) {
        throw new Error('Proposal not found');
      }
      const recipients = investor_ids.map((investor_id) => ({
        proposal_id,
        investor_id,
        status: PROPOSAL_RECIPIENT_STATUS.PENDING,
      }));

      const createdRecipients = await ProposalRecipient.insertMany(recipients);

  
      // Call sendEmailToInvestors to send email after inserting recipients
      await this.sendEmailToInvestors(createdRecipients);
  
      return createdRecipients;
    } catch (error) {
      console.log('Error creating proposal recipient: ' + error);
      throw new Error('Unable to create proposal recipient');
    }
  },
  
  async sendEmailToInvestors(recipients) {
    console.log('recipients', recipients);
    try {
      if (!recipients || recipients.length === 0) {
        throw new Error('No recipients found');
      }
  
      const proposal = await Proposal.findOne({proposal_id : recipients[0].proposal_id});  // Assuming all recipients belong to the same proposal
      if (!proposal) {
        throw new Error('Proposal not found');
      }

      const entrepreneur = await User.findOne({id: proposal.entrepreneur_id});
      console.log('entrepreneur', entrepreneur);
  
      // Fetch all investor emails in a single query for performance
      const investorIds = recipients.map(recipient => recipient.investor_id);
      const investors = await User.find({ id: { $in: investorIds } });
  
      /**
       * 
       * investorMap becomes an object where each investor's id is a key, and their email is the corresponding value.
       * 
       */
      const investorMap = investors.reduce((acc, investor) => {
        acc[investor.id] = investor.email;
        return acc;
      }, {});

      for (const recipient of recipients) {
        const investorEmail = investorMap[recipient.investor_id];
        if (investorEmail) {
          const subject = `New Proposal Sent to You: ${proposal.title}`;
          const text = `You have received a new proposal titled "${proposal.title}" from an "${entrepreneur.username}". Please review it as soon as possible.`;
          const html = `<p>You have received a new proposal titled <strong>"${proposal.title}"</strong> from an "${entrepreneur.username}". Please review it as soon as possible.</p>`;

          await sendEmail(investorEmail, subject, text, html);
        }
      }
  
    } catch (error) {
      console.error('Error sending email to investors: ' + error);
      throw new Error('Unable to send email to investors');
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
