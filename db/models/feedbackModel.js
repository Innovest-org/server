const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  rate: { type: Number, min: 0, max: 5, required: false },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  //TODO
  //projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  feedbackerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
