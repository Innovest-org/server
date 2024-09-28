const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    invest_id: {type: String,required: true, unique: true },

    created_at: {type: Date, default: Date.now,},

    budget_amount: { type:Number , required: true },
    name: {type: String, required: true },

    investor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true },
    project_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
