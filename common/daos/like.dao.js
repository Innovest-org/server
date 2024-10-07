const Like = require('../db/models/likeModel');

class LikeDAO {
  async createLike(likeData) {
    try {
      const like = new Like(likeData);
      await like.save();
    } catch (error) {
      throw new Error('Error creating like: ' + error.message);
    }
  }

  async deleteLike(likeId) {
    try {
      const deletedLike = await Like.findByIdAndDelete(likeId);
      if (!deletedLike) {
        throw new Error('Like not found');
      }
      return true;
    } catch (error) {
      throw new Error('Error deleting like: ' + error.message);
    }
  }

  async getLikesByPage(pageId) {
    try {
      return await Like.find({ page_id: pageId }).populate('user_id', 'username');
    } catch (error) {
      throw new Error('Error fetching likes: ' + error.message);
    }
  }
}
module.exports = LikeDAO
