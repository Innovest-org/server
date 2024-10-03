const mongoose = require('mongoose');

const CommunityUsersSchema = new mongoose.Schema({
    visibility: { type: Boolean, default: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
}, { timestamps: true });

const CommunityUsers = mongoose.model('CommunityUsers', CommunityUsersSchema);

module.exports = CommunityUsers;
