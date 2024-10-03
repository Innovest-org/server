const CommunityDAO = require('../common/daos/community.dao');
const adminDao = require('../common/daos/admin.dao');

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
      console.log(`Attempting to create community for admin: ${admin_id}`);
      const isAdminResult = await adminDao.isAdmin(admin_id);
      console.log(`isAdmin result: ${isAdminResult}`);
      
      if (!isAdminResult) {
        const error = new Error("Only admins can create a community");
        error.statusCode = 403;
        throw error;
      }

      communityData.admins = [admin_id];
      const newCommunity = await CommunityDAO.createCommunity(communityData);
      console.log(`Community created: ${newCommunity._id}`);
      return newCommunity;
    } catch (error) {
      throw new Error('Error creating community:', error.message);
    }
  }


  /**
   * Updates an existing community using the provided data
   * @param {string} community_id - The unique id of the community to update
   * @param {string} admin_id - The unique identifier of the admin updating the community
   * @param {Object} communityData - Data for the updated community
   * @returns {Promise<Community>} - The updated community
   * @throws {Error} - If an error occurs while updating the
   * community or if the admin is not authorized
   */
  async updateCommunity(community_id, admin_id, communityData) {
    const isAdmin = await adminDao.isAdmin(admin_id);
    if (!isAdmin) {
      throw new Error("Only admins can update a community");
    }
    
    // Ensure the community exists before updating
    const community = await CommunityDAO.getCommunity(community_id);
    if (!community) {
      throw new Error(`Community not found: ${community_id}`);
    }

    return await CommunityDAO.updateCommunity(community_id, communityData);
  }


  /**
   * Deletes a community by its id
   * @param {string} community_id - The unique id of the community to delete
   * @param {string} admin_id - The unique identifier of the admin deleting the community
   * @returns {Promise<Community>} - The deleted community
   * @throws {Error} - If an error occurs while deleting the community
   * or if the admin is not authorized
   */
  async deleteCommunity(community_id, admin_id) {
    try {
      const isAdmin = await adminDao.isAdmin(admin_id);
    if (!isAdmin) {
      throw new Error("Only admins can delete a community");
    }

    const community = await CommunityDAO.getCommunity(community_id);
    if (!community || !community.admins.includes(admin_id)) {
      throw new Error('Only admins of this community can delete it');
    }
    return await CommunityDAO.deleteCommunity(community_id);
    } catch (error) {
      console.error('Error deleting community:', error);
    }
  }

  /**
   * Retrieves a community by its id
   * @param {string} community_id - The unique id of the community to retrieve
   * @returns {Promise<Community>} - The community
   * @throws {Error} - If an error occurs while fetching the community
   * or if the community is not found
   */
  async getCommunityById(community_id) {
    const community = await CommunityDAO.getCommunity(community_id);
    if (!community) {
      throw new Error(`Community not found: ${community_id}`);
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

  /**
   * Retrieves a community by its name
   * @param {string} community_name - The unique name of the community to retrieve
   * @returns {Promise<Community>} - The community
   * @throws {Error} - If an error occurs while fetching the community
   * @throws {Error} - If the community is not found
   */
  async getCommunityByName(community_name) {
    try {
      return await CommunityDAO.getCommunityByName(community_name);
    } catch (error) {
      console.error('Error fetching community by name:', error);
    }
  }
}

module.exports = new CommunityServices();
