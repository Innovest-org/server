const { getIo } = require('../config/socket');
const LikeService = require('../services/like.service');
const PageService = require('../services/page.service');
const notificationService = require('../services/notification.service');

class LikeController {
  async createLike(req, res) {
    try {
      const { page_id } = req.params;
      const userId = req.user.id;

      const page = await LikeService.createLike(page_id, userId);

      if (page) {
        notificationService.notifyUser(page.author, 'pageLiked', { page_id, userId });
      }

      getIo().to(page_id).emit('newLike', { page_id, userId });

      return res.status(200).json({ message: 'Like created successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating like: ' + error.message });
    }
  }

  async deleteLike(req, res) {
    try {
      const { like_id } = req.params;
      const userId = req.user.id;

      const hasLiked = await LikeService.hasUserLikedPage(page_id, userId);
      if (!hasLiked) {
        return res.status(403).json({ message: 'You can only delete your own like' });
      }

      const page = await LikeService.deleteLike(like_id, userId);

      getIo().to(page_id).emit('like-deleted', { like_id });

      return res.status(200).json({ message: 'Like deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting like: ' + error.message });
    }
  }

  async getLikesByPage(req, res) {
    try {
      const { page_id } = req.params;
      const likes = await LikeService.getLikesByPage(page_id);

      return res.status(200).json(likes);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching likes: ' + error.message });
    }
  }
}

module.exports = new LikeController();
