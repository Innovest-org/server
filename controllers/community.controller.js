const CommunityServices = require('../services/community.service');
const { CreateCommunityDTO, UpdateCommunityDTO } = require('../common/dtos/communityDTO/community.dto');

class CommunityController {
  /**
   * Creates a new community using the provided data
   * @param {Object} req - The HTTP request object
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with the created community or an error message
   */
  async createCommunity(req, res) {
    try {
      // check on it again
      const admin_id = req.user.id;
      const communityData = new CreateCommunityDTO(req.body);
      const community = await CommunityServices.createCommunity(admin_id, communityData);
      res.status(201).json({ message: 'Community created', community });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  /**
   * Updates an existing community using the provided data
   * @param {Object} req - The HTTP request object containing the
   * community name in the params and update data in the body
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with the updated community or an error message
   */
  async updateCommunity(req, res) {
    try {
      const { community_id } = req.params;
      const admin_id = req.user.id;
      const communityData = new UpdateCommunityDTO(req.body);
      communityData.validate();

      const community = await CommunityServices.updateCommunity(community_id, admin_id, communityData);
      res.status(200).json({ message: 'Community updated', community });

    } catch (error) {
      console.error('Error in updateCommunity:', error);
      res.status(400).json({ message: error.message });
    }
  }


  /**
   * Deletes a community by its name
   * @param {Object} req - The HTTP request object containing the community name in the params
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with a 200 status code if successful or an error message
   */
  async deleteCommunity(req, res) {
    try {
      const { community_id } = req.params;
      const admin_id = req.user.id;

      const community = await CommunityServices.deleteCommunity(community_id, admin_id);
      res.status(200).json({ message: 'Community deleted', community });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Retrieves a community by its name
   * @param {Object} req - The HTTP request object containing the community name in the params
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with the community or an error message
   */
  async getCommunityById(req, res) {
    try {
      const { community_id } = req.params;
      const community = await CommunityServices.getCommunityById(community_id);
      res.status(200).json({ community });
    } catch (error) {
      console.error('Error in getCommunityById:', error);
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  /**
   * Retrieves all communities in the database
   * @param {Object} req - The HTTP request object
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with an array of all communities or an error message
   */
  async getAllCommunities(req, res) {
    try {
      const communities = await CommunityServices.getAllCommunities();
      res.status(200).json({ communities });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Retrieves a community by its name
   * @param {Object} req - The HTTP request object containing the community name in the params
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with the community or an error message
   */
  async getCommunityByName(req, res) {
    try {
      const { community_name } = req.params;
      const community = await CommunityServices.getCommunityByName(community_name);
      res.status(200).json({ community });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Adds a user to a community's pending users list
   * @param {Object} req - The HTTP request object containing
   * the community id in the params and the user id in the body
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with the updated community or an error message
   */
  async addUserToPendingUsers(req, res) {
    try {
      const { community_id } = req.params;
      const { id } = req.user;
      const community = await CommunityServices.addUserToPendingUsers(community_id, id);
      res.status(200).json({ community });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Approves a user to join a community
   * @param {Object} req - The HTTP request object containing
   * the community id in the params and the user id in the body
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with the updated community or an error message
   */
  async approveUserToJoinCommunity(req, res) {
    try {
      const { community_id, user_id } = req.params;
      console.log(user_id);

      const community = await CommunityServices.approveUserToJoinCommunity(community_id, user_id);
      const hasJoined = Array.isArray(community.users) && community.users.includes(user_id);

      console.log(user_id, hasJoined ? 'successfully joined' : 'failed to join');

      if (hasJoined) {
        community.member_count = community.users.length;
        await community.save();
        res.status(200).json({
          message: 'User has successfully joined the community.',
          community,
        });
      } else {
        res.status(400).json({
          message: 'Failed to join the community. Please try again.',
          community,
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Rejects a user to join a community
   * @param {Object} req - The HTTP request object containing
   * the community id in the params and the user id in the body
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with the updated community or an error message
   */
  async rejectUserToJoinCommunity(req, res) {
    try {
      const { community_id, user_id } = req.params;
      const community = await CommunityServices.rejectUserToJoinCommunity(community_id, user_id);
      res.status(200).json({
        message:
          'User has been rejected from joining the community.',
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
  * Removes a user from a community
  * @param {Object} req - The request object
  * @param {Object} res - The response object
  * @returns {Promise<void>}
  */
  async removeUserFromCommunity(req, res) {
    const { community_id, user_id } = req.params;
    const authenticatedUserId = req.user.id;
    const userRole = req.user.role;

    const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'ADMIN';

    if (!isAdmin && authenticatedUserId !== user_id) {
      return res.status(403).json({ message: 'Forbidden: You can only remove yourself from the community' });
    }

    try {
      const updatedCommunity = await CommunityServices.removeUserFromCommunity(community_id, user_id);
      res.status(200).json({ message: 'User removed successfully', updatedCommunity });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Retrieves users of a community
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Promise<void>}
   */
  async getCommunityUsers(req, res) {
    const { community_id } = req.params;

    try {
      const users = await CommunityService.getCommunityUsers(community_id);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
  * Handles the request to search for communities by their name.
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  */
  async searchCommunities(req, res) {
    try {
      const { communityNameQuery } = req.query;
      if (!communityNameQuery) {
        return res.status(400).json({ message: 'Community name is required' });
      }

      const communities = await CommunityServices.searchCommunitiesByName(communityNameQuery);
      res.status(200).json(communities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CommunityController();
