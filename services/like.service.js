const LikeDAO = require('../daos/LikeDAO');

class LikeService {
  async createLike(likeData) {
    try {
      return await LikeDAO.createLike(likeData);
    } catch (error) {
      throw new Error('Error creating like: ' + error.message);
    }
  }

  async deleteLike(likeId) {
    try {
      return await LikeDAO.deleteLike(likeId);
    } catch (error) {
      throw new Error('Error deleting like: ' + error.message);
    }
  }

  async getLikesByPage(pageId) {
    try {
      return await LikeDAO.getLikesByPage(pageId);
    } catch (error) {
      throw new Error('Error fetching likes: ' + error.message);
    }
  }

}

module.exports = LikeService