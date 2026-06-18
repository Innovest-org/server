const InvestmentInterestService = require('../services/InvestmentInterestService');

const InvestmentInterestController = {
  async expressInterest(req, res) {
    try {
      const { proposal_id } = req.body;
      const investor_id = req.user.user_id; // Assuming `req.user` is set in authentication middleware

      const interest = await InvestmentInterestService.expressInterest(investor_id, proposal_id);
      return res.status(201).json(interest);
    } catch (error) {
      console.error('Error expressing interest:', error);
      return res.status(500).json({ message: 'Unable to express interest' });
    }
  }
};

module.exports = InvestmentInterestController;
