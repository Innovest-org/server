const InvestmentInterestDAO = require('../common/daos/investments.dao');
const ProposalDAO = require('../common/daos/proposal.dao')
const NotificationService = require('./notification.service');


const InvestmentInterestService = {
  async expressInterest(proposalId, investorId, amount, comment) {
    try {
      const proposal = await ProposalDAO.getProposalById(proposalId);
      if (!proposal) {
        throw new Error('Proposal not found');
      }
      if (proposal.status !== 'Open') {
        throw new Error('Proposal is not open for investment');
      }

      const interest = await InvestmentInterestDAO.createInvestmentInterest(
        proposalId,
        investorId,
        amount,
        comment
      );

      await NotificationService.notifyUser(
        proposal.entrepreneur_id,
        'New Investment Interest',
        `An investor has expressed interest of ${amount} in your proposal: ${proposal.title}`,
        {
          type: 'investment_interest',
          interest_id: interest.interest_id,
          proposal_id: proposalId
        }
      );

      return interest;
    } catch (error) {
      console.error('Service Error - Express Interest:', error);
      throw new Error(error.message || 'Unable to express interest');
    }
  },

    async reviewInterest(interestId, status, reviewerId, comment) {
        try {
          const updatedInterest = await InvestmentInterestDAO.updateInterestStatus(
            interestId,
            status,
            reviewerId,
            comment
          );

          const proposal = await ProposalDAO.getProposalById(updatedInterest.proposal_id);

          await NotificationService.notifyUser(
            updatedInterest.investor_id,
            'Investment Interest Update',
            `Your interest in ${proposal.title} has been ${status.toLowerCase()}`,
            {
              type: 'interest_review',
              interest_id: interestId,
              status: status,
              comment: comment
            }
          );

          return updatedInterest;
        } catch (error) {
          console.error('Service Error - Review Interest:', error);
          throw new Error(error.message || 'Unable to review interest');
        }
      }
    };

module.exports = InvestmentInterestService;
