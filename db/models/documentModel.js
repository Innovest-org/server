const mongoose = require('mongoose');

// Define the Document schema
const documentSchema = new mongoose.Schema({
   document_id: {type: String, required: true, default: mongoose.Types.ObjectId, unique: true},
   file_name: {type: String, required: true},
   file_url: {type: String, required: true},
   project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project',  required: true} // Reference to the Project model
}, { timestamps: true });

documentSchema.index({ project_id: 1 });


const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
