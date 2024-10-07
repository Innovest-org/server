const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const CommentSchema = new mongoose.Schema({
    user_id: { type: String, ref: 'User', required: true },
    page_id: { type: String, ref: 'Page', required: true },
    content: { type: String, required: true, maxlength: 1000 },
}, { timestamps: true });

CommentSchema.index({ user_id: 1, page_id: 1 });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
