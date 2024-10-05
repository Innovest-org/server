const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CommunitySchema = new mongoose.Schema({
   community_id: { type: String, default: uuidv4, unique: true, },
   community_name: { type: String, unique: true, required: true, maxlength: 100 },
   description: { type: String, required: true },
   image_url: { type: String },
   admins: [{ type: String, ref: 'Admin' }],
   member_count: { type: Number, default: 0 },
   tags: [{ type: String }],
   pending_users: [{ type: String, ref: 'User' }] 
}, {
   timestamps: true,
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
});

CommunitySchema.virtual('users', {
   ref: 'CommunityUsers',
   localField: '_id',
   foreignField: 'community_id'
});

CommunitySchema.virtual('pages', {
   ref: 'CommunityPages',
   localField: '_id',
   foreignField: 'community_id'
});

CommunitySchema.set('toJSON', {
   transform: function (doc, ret) {
      delete ret._id;
      return ret;
   }
});
const Community = mongoose.model('Community', CommunitySchema);
module.exports = Community;
