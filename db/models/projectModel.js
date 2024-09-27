const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    project_id: { type: String, required: true, unique: true },
    entrepreneur_id: { type: String , required: true, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    project_name: { type: String, required: true },
    description: { type: String, required: true },
    document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', },
    status: { type: String,  required: true },
    visibility: { type: Boolean, default: true },
    field: { type: String, required: true },
    budget: { type: Number, required: true },
    offer: {type: Number,  required: true },
    target: { type: Number,  required: true },
    deadline: {type: String, required: true },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document', }]
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
