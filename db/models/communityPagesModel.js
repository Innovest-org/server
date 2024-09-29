const mongoose = require('mongoose');

const CommunityPagesSchema = new mongoose.Schema({
    community_name: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
    page_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    visibility: { type: Boolean, default: true },
}, { timestamps: true });

CommunityPagesSchema.index({ community_id: 1, page_id: 1 }, { unique: true });

const CommunityPages = mongoose.model('CommunityPages', CommunityPagesSchema);
module.exports = CommunityPages;
