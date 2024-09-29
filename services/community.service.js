const CommunityDAO = require('../common/daos/community.dao');
const userDao = require('../common/daos/user.dao');

class CommunityServices {
  /**
   * Creates a new community using the provided data
   * @param {string} admin_id - The unique identifier of the admin creating the community
   * @param {Object} communityData - Data for the new community
   * @returns {Promise<Community>} - The newly created community
   * @throws {Error} - If an error occurs while saving the community
   */
  async createCommunity(admin_id, communityData) {
    
    try {
      const isAdmin = await userDao.isAdmin(admin_id);
    if (!isAdmin) {
      throw new Error("Only admins can create a community");
    }
    communityData.admins = [admin_id];
    return await CommunityDAO.createCommunity(communityData);
    } catch (error) {
      console.error('Error creating community:', error);
      throw new Error('Unable to create community at the moment');
    }
  }

  /**
   * Updates an existing community using the provided data
   * @param {string} communityName - The unique name of the community to update
   * @param {string} admin_id - The unique identifier of the admin updating the community
   * @param {Object} communityData - Data for the updated community
   * @returns {Promise<Community>} - The updated community
   * @throws {Error} - If an error occurs while updating the community
   */
  async updateCommunity(communityName, admin_id, communityData) {
    const isAdmin = await userDao.isAdmin(admin_id);
    if (!isAdmin) {
      throw new Error("Only admins can update a community");
    }
    
    // Ensure the community exists before updating
    const community = await CommunityDAO.getCommunity(communityName);
    if (!community) {
      throw new Error(`Community not found: ${communityName}`);
    }

    return await CommunityDAO.updateCommunity(communityName, communityData);
  }

  /**
   * Deletes a community by its name
   * @param {string} communityName - The unique name of the community to delete
   * @param {string} admin_id - The unique identifier of the admin deleting the community
   * @returns {Promise<Community>} - The deleted community
   * @throws {Error} - If an error occurs while deleting the community or if the admin is not authorized to delete the community
   */
  async deleteCommunity(communityName, admin_id) {
    const isAdmin = await userDao.isAdmin(admin_id);
    if (!isAdmin) {
      throw new Error("Only admins can delete a community");
    }

    const community = await CommunityDAO.getCommunity(communityName);
    if (!community || !community.admins.includes(admin_id)) {
      throw new Error('Only admins of this community can delete it');
    }
    return await CommunityDAO.deleteCommunity(communityName);
  }

  /**
   * Retrieves a community by its name
   * @param {string} communityName - The unique name of the community to retrieve
   * @returns {Promise<Community>} - The community
   * @throws {Error} - If an error occurs while fetching the community or if the community does not exist
   */
  async getCommunityById(communityName) {
    const community = await CommunityDAO.getCommunity(communityName);
    if (!community) {
      throw new Error(`Community not found: ${communityName}`);
    }
    return community;
  }

  /**
   * Retrieves all communities in the database
   * @returns {Promise<Community[]>} - An array of all communities
   * @throws {Error} - If an error occurs while fetching the communities
   */
  async getAllCommunities() {
    try {
      return await CommunityDAO.getAllCommunities();
    } catch (error) {
      console.error('Error fetching communities:', error);
      throw new Error('Unable to retrieve communities at the moment');
    }
  }
}

module.exports = new CommunityServices();
