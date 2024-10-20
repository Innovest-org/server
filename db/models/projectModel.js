const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const projectSchema = new mongoose.Schema({
  project_id:{ type: String, default: uuidv4, unique: true },	 
  project_name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  entrepreneur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the entrepreneur user who submitted the project
  status: { 
    type: String, 
    enum: ['under review', 'funded', 'funding'], 
    default: 'under review', 
    required: true 
    },
  visibility: { type: Boolean, default: true },
  field: { type: String, required: true },
  budget: { type: Number, required: true },
  offer: { type: Number },
  target: { type: Number },
  deadline: { type: String, required: true },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }], // Refers to the related documents for this project

}, { timestamps: true });

 projectSchema.index({ entrepreneur_id: 1 });


const Project = mongoose.model('Project', projectSchema)
module.exports = Project;

