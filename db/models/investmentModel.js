const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
 
const investmentSchema = new mongoose.Schema({
    proposal_id: { type: String, ref: 'Proposal', required: true },
    investor_id: { type: String, ref: 'User', required: true },
    project_id: { type: String, ref: 'Project', required: true },
    amount_invested: { type: Number, required: true },
    transaction_date: { type: Date, default: Date.now },
    payment_status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
}, { timestamps: true });


const investmentInterestSchema = new mongoose.Schema({
    interest_id: { type: String, default: uuidv4, unique: true },
    investor_id: { type: String, ref: 'User', required: true },
    proposal_id: { type: String, ref: 'Proposal', required: true },
    comment: { type: String, required: true, minlength: 10, maxlength: 500 },
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Declined', 'Withdrawn'], // Added Withdrawn status
        default: 'Pending' 
    },
    status_history: [{
        status: { type: String },
        comment: { type: String },
        updated_by: { type: String, ref: 'User' },
        updated_at: { type: Date, default: Date.now }
    }],
    created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const InvestmentInterest = mongoose.model('InvestmentInterest', investmentInterestSchema);

const Investment = mongoose.model('Investment', investmentSchema);

module.exports ={ Investment, InvestmentInterest };
