const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CommunitySchema = new mongoose.Schema({
   community_name: { type: String, unique: true, required: true, maxlength: 100 },
   description: { type: String, required: true },
   image: { type: String, required: false },
   admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }],
   users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommunityUsers' }],
   pages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommunityPages' }],
}, { _id: false, timestamps: true }); // Disable automatic _id creation

const Community = mongoose.model('Community', CommunitySchema);
module.exports = Community;
