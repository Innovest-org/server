const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  project_id: { type: String, ref: 'Project', required: true },
  investor_id: { type: String, ref: 'User', required: true },
  amount: { type: Number, required: true },
  milestones: { type: String, required: true },
  benefits: { type: String, required: true },
  terms: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;