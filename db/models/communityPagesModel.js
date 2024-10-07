const mongoose = require('mongoose');

const CommunityPagesSchema = new mongoose.Schema({
    community_id: { type: String, ref: 'Community', required: true },
    page_id: { type: String, ref: 'Page', required: true },
    is_pinned: { type: Boolean, default: false },
    page_status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING',
    },
    is_featured: { type: Boolean, default: false },
    admin: { type: String, ref: 'Admin' }, // admin who created this association
    approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // admin who approved the page
    visibility: { type: Boolean, default: true },
}, { timestamps: true });

CommunityPagesSchema.index({ community_id: 1, page_id: 1 }, { unique: true });

const CommunityPages = mongoose.model('CommunityPages', CommunityPagesSchema);
module.exports = CommunityPages;
