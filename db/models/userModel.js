const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, 

  firstName: { type: String, required: true, maxlength: 30 },
  lastName: { type: String, required: true, maxlength: 30 },
  userName: { type: String, required: true, unique: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: false, match: /^[0-9]{10,15}$/ },
  country: { type: String, required: true },
  languages: [{ type: String, required: false }],
  profileImage: { type: String, default: 'https://i.ibb.co/6WtQfMm/default.png', required: false },
  socialLinks: [{ type: String, required: false }],
  role: {
    type: String,
    enum: ['ENTREPRENEUR', 'INVESTOR', 'MENTOR', 'ADMIN'],
    default: 'ENTREPRENEUR'
  },
  isVerified: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },

  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interest',  required: false }],
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
  //TODO
  //projects, investments, ...
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

module.exports = User;
