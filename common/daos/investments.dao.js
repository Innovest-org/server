const { InvestmentInterest } = require('../../db/models/investmentModel');


const InvestmentInterestDAO = {
    async createInvestmentInterest(proposalId, investorId, amount, comment) {
      try {
        // Check if investor already has pending interest for this proposal
        const existingInterest = await InvestmentInterest.findOne({
          proposal_id: proposalId,
          investor_id: investorId,
          status: 'Pending'
        });
  
        if (existingInterest) {
          throw new Error('Investor already has a pending interest for this proposal');
        }
  
        const interest = new InvestmentInterest({
          proposal_id: proposalId,
          investor_id: investorId,
          amount,
          comment,
          status_history: [{
            status: 'Pending',
            comment: 'Initial interest expressed',
            updated_by: investorId
          }]
        });
  
        return await interest.save();
      } catch (error) {
        console.error('DAO Error - Create Interest:', error);
        throw new Error(error.message || 'Unable to create investment interest');
      }
    },

  async getInterestsByEntrepreneur(entrepreneurId, filters = {}) {
    try {
      const query = await InvestmentInterest.aggregate([
        // Join with proposals to get entrepreneur_id
        {
          $lookup: {
            from: 'proposals',
            localField: 'proposal_id',
            foreignField: 'proposal_id',
            as: 'proposal'
          }
        },
        { $unwind: '$proposal' },
        {
          $match: {
            'proposal.entrepreneur_id': entrepreneurId,
            ...(filters.status && { status: filters.status })
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'investor_id',
            foreignField: 'user_id',
            as: 'investor'
          }
        },
        { $unwind: '$investor' },
        {
          $project: {
            interest_id: 1,
            status: 1,
            amount: 1,
            comment: 1,
            created_at: 1,
            'investor.username': 1,
            'investor.email': 1,
            'proposal.title': 1
          }
        }
      ]);

      return query;
    } catch (error) {
      console.error('DAO Error - Get Interests:', error);
      throw new Error('Unable to get investment interests');
    }
  },

  async updateInterestStatus(interestId, status, updatedBy, comment) {

    try {
      const updatedInterest = await InvestmentInterest.findOneAndUpdate(
        { interest_id: interestId },
        {
          $set: { status },
          $push: {
            status_history: {
              status,
              comment,
              updated_by: updatedBy,
              updated_at: new Date()
            }
          }
        },
        { new: true, session }
      );

      if (!updatedInterest) {
        throw new Error('Interest not found');
      }
      return updatedInterest;
    } catch (error) {
      await session.abortTransaction();
      console.error('DAO Error - Update Status:', error);
      throw new Error('Unable to update interest status');
    } finally {
      session.endSession();
    }
  },
}

module.exports = InvestmentInterestDAO;