const CommentDAO = require('../daos/CommentDAO');

class CommentService {
  async createComment(commentData) {
    try {
      return await CommentDAO.createComment(commentData);
    } catch (error) {
      throw new Error('Error creating comment: ' + error.message);
    }
  }

  async updateComment(commentId, updateData) {
    try {
      return await CommentDAO.updateComment(commentId, updateData);
    } catch (error) {
      throw new Error('Error updating comment: ' + error.message);
    }
  }

  async deleteComment(commentId) {
    try {
      return await CommentDAO.deleteComment(commentId);
    } catch (error) {
      throw new Error('Error deleting comment: ' + error.message);
    }
  }

  async getCommentsByPage(pageId) {
    try {
      return await CommentDAO.getCommentsByPage(pageId);
    } catch (error) {
      throw new Error('Error fetching comments: ' + error.message);
    }
  }
}

module.exports = new CommentService();
