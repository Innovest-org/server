class InvestmentDTO {
    constructor(invest_id, created_at, budget_amount, name, investor_id, project_id) {
        this.invest_id = invest_id;
        this.created_at = created_at;
        this.budget_amount = budget_amount;
        this.name = name;
        this.investor_id = investor_id;
        this.project_id = project_id;
    }
}


const InvestmentInterestDTO = {
    fromRequest: (interest) => ({
        proposal_id: dto.proposal_id,
        investor_id: dto.investor_id,
        amount: dto.amount,
        comment: dto.comment,
        status: 'Pending',
        status_history: [{
          status: 'Pending',
          comment: dto.comment,
          updated_by: dto.investor_id,
          updated_at: new Date()
        }]
    }),

    toResponse: (interest) => ({
        interest_id: interest.interest_id,
        proposal: {
          id: interest.proposal_id,
          title: interest.proposal?.title || null,
        },
        investor: {
          id: interest.investor_id,
          name: interest.investor?.name || null,
          email: interest.investor?.email || null
        },
        amount: interest.amount,
        status: interest.status,
        comment: interest.comment,
        created_at: interest.created_at,
        updated_at: interest.updated_at
    })
}
module.exports = {InvestmentDTO, InvestmentInterestDTO};
