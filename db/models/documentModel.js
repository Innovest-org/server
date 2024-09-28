const mongoose = require('mongoose');

// Define the Document schema
const documentSchema = new mongoose.Schema({
   document_id: {type: String, required: true, default: mongoose.Types.ObjectId, unique: true},


   created_at: {  type: Date, default: Date.now, required: true },
   updated_at: {type: Date, default: Date.now },

   
   file_name: {type: String, required: true},
   file_url: {type: String, required: true},

   project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project',  required: true} // Reference to the Project model
});


const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
