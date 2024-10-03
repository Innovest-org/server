const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CommunitySchema = new mongoose.Schema({
   community_id: { type: String, default: uuidv4, unique: true, },
   community_name: { type: String, unique: true, required: true, maxlength: 100 },
   description: { type: String, required: true },
   image: { type: String, required: false },
   admins: [{ type: String, ref: 'Admin' }],
   users: [{ type: String, ref: 'CommunityUsers' }],
   pages: [{ type: String, ref: 'CommunityPages' }],
}, {timestamps: true });

CommunitySchema.set('toJSON', {
   transform: function (doc, ret) {
     delete ret._id; // Remove _id from the response
      return ret;
   }
});
const Community = mongoose.model('Community', CommunitySchema);
module.exports = Community;
