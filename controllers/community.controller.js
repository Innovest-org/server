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
      const { user_id } = req.body;
      const community = await CommunityServices.addUserToPendingUsers(community_id, user_id);
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
      const { community_id } = req.params;
      const { user_id } = req.body;
      const community = await CommunityServices.approveUserToJoinCommunity(community_id, user_id);
      res.status(200).json({ community });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async rejectUserToJoinCommunity(req, res) {
    try {
      const { community_id } = req.params;
      const { user_id } = req.user.id;
      const community = await CommunityServices.rejectUserToJoinCommunity(community_id, user_id);
      res.status(200).json({ community });
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
    const { communityId} = req.params;
    const { user_id } = req.body;

    try {
      const updatedCommunity = await CommunityService.removeUserFromCommunity(communityId, user_id);
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
}

module.exports = new CommunityController();
