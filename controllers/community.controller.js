const CommunityServices = require('../services/community.service');
const { CreateCommunityDTO, UpdateCommunityDTO } = require('../common/dtos/community.dto');

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
      const admin_id = req.user.admin_id;
      const communityData = new CreateCommunityDTO(req.body);
      const community = await CommunityServices.createCommunity(admin_id, communityData);
      res.status(201).json({ message: 'Community created', community });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  /**
   * Updates an existing community using the provided data
   * @param {Object} req - The HTTP request object containing the community name in the params and update data in the body
   * @param {Object} res - The HTTP response object
   * @returns {Promise<void>} - Responds with the updated community or an error message
   */
  async updateCommunity(req, res) {
    try {
      const { community_name } = req.params;
      const admin_id = req.user.admins;
      const communityData = new UpdateCommunityDTO(req.body);
      communityData.validate();

      const community = await CommunityServices.updateCommunity(community_name, admin_id, communityData);
      res.status(200).json({ message: 'Community updated', community });
    } catch (error) {
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
      const { community_name } = req.params;
      const admin_id = req.user.admins; // Updated here

      const community = await CommunityServices.deleteCommunity(community_name, admin_id);
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
      const { community_name } = req.params;
      const community = await CommunityServices.getCommunityById(community_name);
      res.status(200).json({ community });
    } catch (error) {
      res.status(400).json({ message: error.message });
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
}

module.exports = new CommunityController();
