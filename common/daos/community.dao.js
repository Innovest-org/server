const Community = require('../../db/models/communityModel');

class CommunityDAO {
  /**
   * Creates a new community using the provided data
   * @param {Object} communityData - Data for the new community
   * @returns {Promise<Community>} - The newly created community
   * @throws {Error} - If an error occurs while saving the community
   */
  async createCommunity(communityData) {
    try {
      return await Community.create(communityData);
    } catch (error) {
      throw new Error('Error creating community: ' + error.message);
    }
  }

  /**
   * Updates an existing community using the provided data
   * @param {string} communityName - The unique name of the community to update
   * @param {Object} communityData - Data for the updated community
   * @returns {Promise<Community>} - The updated community
   * @throws {Error} - If an error occurs while updating the community
   */
  async updateCommunity(communityName, communityData) {
    try {
      return await Community.findOneAndUpdate({ community_name: communityName }, communityData, { new: true });
    } catch (error) {
      throw new Error('Error updating community: ' + error.message);
    }
  }

  /**
   * Deletes a community by its name
   * @param {string} communityName - The unique name of the community to delete
   * @returns {Promise<Community>} - The deleted community
   * @throws {Error} - If an error occurs while deleting the community
   */
  async deleteCommunity(communityName) {
    try {
      return await Community.findOneAndDelete({ community_name: communityName });
    } catch (error) {
      throw new Error('Error deleting community: ' + error.message);
    }
  }

  /**
   * Retrieves all communities in the database
   * @returns {Promise<Community[]>} - An array of all communities
   * @throws {Error} - If an error occurs while fetching the communities
   */
  async getAllCommunities() {
    try {
      return await Community.find({})
        .populate('admins')
        .populate('users')
        .populate('pages');
    } catch (error) {
      throw new Error('Error fetching communities: ' + error.message);
    }
  }

  /**
   * Retrieves a community by its name
   * @param {string} communityName - The unique name of the community to retrieve
   * @returns {Promise<Community>} - The community
   * @throws {Error} - If an error occurs while fetching the community
   */
  async getCommunity(communityName) {
    try {
        return await Community.findOne({ community_name: communityName })
            .populate('admins')
            .populate('users')
            .populate('pages');
    } catch (error) {
        throw new Error('Error fetching community: ' + error.message);
    }
}

}

module.exports = new CommunityDAO();
