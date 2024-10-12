const Like = require('../../db/models/likeModel');
const Page = require('../../db/models/pageModel');
const { User } = require('../../db/models/userModel');

class LikeDAO {
  async createLike(pageId, userId) {
    try {
      const existingLike = await Like.findOne({ page_id: pageId, user_id: userId });
      if (existingLike) {
        throw new Error('User has already liked this page');
      }

      const like = new Like({ page_id: pageId, user_id: userId });

      const page = await Page.findOneAndUpdate(
        { page_id: pageId },
        { $inc: { likes: 1 } },
        { new: true }
      );

      if (!page) {
        throw new Error('Page not found');
      }

      await like.save();
      return page;
    } catch (error) {
      throw new Error('Error creating like: ' + error.message);
    }
  }

  async deleteLike(likeId, userId) {
    try {
      const like = await Like.findOneAndDelete({ _id: likeId, user_id: userId });
      if (!like) {
        throw new Error('Like not found or not owned by the user');
      }

      const page = await Page.findOneAndUpdate(
        { page_id: like.page_id },
        { $inc: { likes: -1 } },
        { new: true }
      );

      if (!page) {
        throw new Error('Page not found');
      }

      return page;
    } catch (error) {
      throw new Error('Error deleting like: ' + error.message);
    }
  }

  async getLikesByPage(pageId) {
    try {
      const likes = await Like.find({ page_id: pageId });
      const populatedLikes = await Promise.all(
        likes.map(async (like) => {
          const user = await User.findOne({ id: like.user_id });
          return {
            ...like.toObject(),
            user: user ? { username: user.username } : null,
          };
        })
      );
  
      return populatedLikes;
    } catch (error) {
      throw new Error('Error fetching likes: ' + error.message);
    }
  }
  

  async hasUserLikedPage(pageId, userId) {
    try {
      const like = await Like.findOne({ page_id: pageId, user_id: userId });
      return like !== null;
    } catch (error) {
      throw new Error('Error checking if user has liked the page: ' + error.message);
    }
  }
}

module.exports = new LikeDAO();
