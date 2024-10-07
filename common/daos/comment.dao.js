// src/daos/CommentDAO.js
const Comment = require('../db/models/commentModel');

class CommentDAO {
  async createComment(commentData) {
    try {
      const comment = new Comment(commentData);
      return await comment.save();
    } catch (error) {
      throw new Error('Error creating comment: ' + error.message);
    }
  }

  async updateComment(commentId, updateData) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        { comment_id: commentId },
        updateData,
        { new: true });
      if (!updatedComment) {
        throw new Error('Comment not found');
      }
      return updatedComment;
    } catch (error) {
      throw new Error('Error updating comment: ' + error.message);
    }
  }

  async deleteComment(commentId) {
    try {
      const deletedComment = await Comment.findByIdAndDelete({comment_id: commentId});
      if (!deletedComment) {
        throw new Error('Comment not found');
      }
      return true;
    } catch (error) {
      throw new Error('Error deleting comment: ' + error.message);
    }
  }

  async getCommentsByPage(pageId) {
    try {
      return await Comment.find({ page_id: pageId }).populate('user_id', 'username');
    } catch (error) {
      throw new Error('Error fetching comments: ' + error.message);
    }
  }
}

module.exports = new CommentDAO();
