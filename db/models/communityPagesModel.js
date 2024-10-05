const mongoose = require('mongoose');

const CommunityPagesSchema = new mongoose.Schema({
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
    page_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
    is_pinned: { type: Boolean, default: false },
    is_featured: { type: Boolean, default: false },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    visibility: { type: Boolean, default: true },
}, { timestamps: true });

CommunityPagesSchema.index({ community_id: 1, page_id: 1 }, { unique: true });

const CommunityPages = mongoose.model('CommunityPages', CommunityPagesSchema);
module.exports = CommunityPages;
