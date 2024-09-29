const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const pageSchema = new mongoose.Schema({
  page_id: { type: String, default: uuidv4, unique: true },
  title: { type: String, required: true, maxlength: 500 },
  content: { type: String, required: true },
  location: { type: String, required: false },
  images_url: { type: [String], default: [] },
  page_url: { type: String, required: true },
  start_time: { type: Date, required: false },
  end_time: { type: Date, required: false },
  page_type: {
    type: String,
    enum: ['EVENT', 'INFORMATION', 'POST', 'OTHER'],
  },
  page_state: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;
