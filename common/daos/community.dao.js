const Community = require('../../db/models/communityModel');
const { v4: uuidv4 } = require('uuid');

class CommunityDAO {
  /**
   * Creates a new community using the provided data
   * @param {Object} communityData - Data for the new community
   * @returns {Promise<Community>} - The newly created community
   * @throws {Error} - If an error occurs while saving the community
   */
  async createCommunity(communityData) {
    try {
      if (communityData.admins && !Array.isArray(communityData.admins)) {
        communityData.admins = [communityData.admins];
      }

      const community = new Community({
        community_id: uuidv4(),
        ...communityData,
      });

      return await community.save();
    } catch (error) {
      if (error.code === 1100) {
        throw new Error(
          `A community with the name "${communityData.community_name}" already exists.`,
        );
      }
      throw new Error('Error creating community: ' + error.message);
    }
  }

  /**
   * Updates an existing community using the provided data
   * @param {string} communityId - The unique id of the community to update
   * @param {Object} communityData - Data for the updated community
   * @returns {Promise<Community>} - The updated community
   * @throws {Error} - If an error occurs while updating the community or if the community is not found
   */
  async updateCommunity(communityId, communityData) {
    try {
      const updatedCommunity = await Community.findOneAndUpdate(
        { community_id: communityId },
        communityData,
        { new: true },
      );

      if (!updatedCommunity) {
        throw new Error('Community not found');
      }
      return updatedCommunity;
    } catch (error) {
      throw new Error('Error updating community: ' + error.message);
    }
  }

  /**
   * Deletes a community by its id
   * @param {string} communityId - The unique id of the community to delete
   * @returns {Promise<Community>} - The deleted community
   * @throws {Error} - If an error occurs while deleting the community
   * or if the community is not found
   */
  async deleteCommunity(communityId) {
    try {
      const deletedCommunity = await Community.findOneAndDelete({
        community_id: communityId,
      });
      if (!deletedCommunity) {
        throw new Error('Community not found');
      }
      return deletedCommunity;
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
      return await Community.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Retrieves a community by its id
   * @param {string} communityId - The unique id of the community to retrieve
   * @returns {Promise<Community>} - The community
   * @throws {Error} - If an error occurs while fetching the community or
   * if the community is not found
   */
  async getCommunity(communityId) {
    try {
      const community = await Community.findOne({ community_id: communityId });
      if (!community) {
        throw new Error(`Community not found with ID: ${communityId}`);
      }
      return community;
    } catch (error) {
      console.error('Error fetching community:', error);
      throw new Error('Error fetching community: ' + error.message);
    }
  }

  /**
   * Retrieves a community by its name
   * @param {string} community_id - The community name to retrieve
   * @returns {Promise<Community>} - The community
   * @throws {Error} - If an error occurs while fetching the community
   */
  async getCommunityByName(community_name) {
    try {
      const community = await Community.findOne({ community_name: community_name });
      if (!community) {
        throw new Error('Community not found');
      }
      return community;
    } catch (error) {
      console.error('Error fetching community by name:', error);
      throw new Error('Error fetching community: ' + error.message);
    }
  }

  /**
   * Adds a user to a community's pending users list
   * @param {string} communityId - The unique id of the community to add the user to
   * @param {string} userId - The unique id of the user to add
   * @returns {Promise<Community>} - The updated community
   * @throws {Error} - If an error occurs while updating the community
   */
  async addUserToPendingUsers(communityId, userId) {
    try {
      return await Community.findOneAndUpdate(
        { community_id: communityId },
        { $addToSet: { pending_users: userId } },
        { new: true },
      )
    } catch (error) {
      console.error('Error adding user to pending users:', error);
      throw new Error('Error adding user to pending users: ' + error.message);
    }
  }

  /**
   * Adds a user to a community's user list
   * @param {string} communityId - The unique id of the community to add the user to
   * @param {string} userId - The unique id of the user to add
   * @returns {Promise<Community>} - The updated community
   * @throws {Error} - If an error occurs while updating the community
   */
  async approveUserToJoinCommunity(communityId, userId) {
    try {
      return await Community.findOneAndUpdate(
        { community_id: communityId },
        {
          $pull: { pending_users: userId },
          $addToSet: { users: userId }
        },
        { new: true },
      )
    } catch (error) {
      console.error('Error approving user to join community:', error);
      throw new Error('Error approving user to join community: ' + error.message);
    }
  }

  async rejectUserToJoinCommunity(communityId, userId) {
    try {a
      return await Community.findOneAndUpdate(
        { community_id: communityId },
        { $pull: { pending_users: userId } },
        { new: true },
      )
    } catch (error) {
      console.error('Error rejecting user to join community:', error);
      throw new Error('Error rejecting user to join community: ' + error.message);
    }
  }

  /**
   * Removes a user from a community's user list
   * @param {string} communityId - The unique id of the community to remove the user from
   * @param {string} userId - The unique id of the user to remove
   * @returns {Promise<Community>} - The updated community
   * @throws {Error} - If an error occurs while updating the community
   */
  async removeUserFromCommunity(communityId, userId) {
    try {
      return await Community.findOneAndUpdate(
        { community_id: communityId },
        { $pull: { users: userId } },
        { new: true },
      )
    } catch (error) {
      console.error('Error removing user from community:', error);
      throw new Error('Error removing user from community: ' + error.message);
    }
  }

  /**
   * Retrieves the users of a community
   * @param {string} communityId - The unique id of the community to retrieve users for
   * @returns {Promise<Community>} - The community with its users populated
   * @throws {Error} - If an error occurs while retrieving the community
   */
  async getCommunityUsers(communityId) {
    try {
      const community = await Community.findOne({ community_id: communityId }).populate('users');
      return community ? community.users : [];
    } catch (error) {
      console.error('Error fetching community users:', error);
      throw new Error('Error fetching community users: ' + error.message);
    }
  }

}

module.exports = new CommunityDAO();
