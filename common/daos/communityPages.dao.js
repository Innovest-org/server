const CommunityPages = require('../../db/models/communityPagesModel');
const Page = require('../../db/models/pageModel');

class CommunityPagesDAO {
  /**
   * Creates a new community page using the provided data
   * @param {Object} pageData - Data for the new community page
   * @returns {Promise<CommunityPages>} - The newly created community page
   * @throws {Error} - If an error occurs while saving the community page
   */
  async createCommunityPage(pageData) {
    try {
      const communityPage = new CommunityPages(pageData);
      return await communityPage.save();
    } catch (error) {
      throw new Error('Error creating community page: ' + error.message);
    }
  }


  /**
   * Updates a community page by its ID using the provided data
   * @param {string} communityId - The unique identifier of the community to update
   * @param {string} pageId - The unique identifier of the page to update
   * @param {Object} pageData - Data for the updated community page
   * @returns {Promise<CommunityPages>} - The updated community page
   * @throws {Error} - If an error occurs while updating the community page
   */
  async updateCommunityPage(communityId, pageId, pageData) {
    try {
      return await CommunityPages.findOneAndUpdate({ community_name: communityId, page_id: pageId }, pageData, { new: true });
    } catch (error) {
      throw new Error('Error updating community page: ' + error.message);
    }
  }

  /**
   * Deletes a community page by its ID
   *
   * @param {string} communityId - The unique identifier of the community to delete the page from
   * @param {string} pageId - The unique identifier of the page to delete
   * @returns {Promise<CommunityPages>} - The deleted community page
   * @throws {Error} - If an error occurs while deleting the community page
   */
  async deleteCommunityPage(communityId, pageId) {
    try {
      return await CommunityPages.findOneAndDelete({ community_id: communityId, page_id: pageId });
    } catch (error) {
      throw new Error('Error deleting community page: ' + error.message);
    }
  }

  /**
   * Retrieves a community page by its ID
   * @param {string} communityId - The unique identifier of the community to retrieve the page from
   * @param {string} pageId - The unique identifier of the page to retrieve
   * @returns {Promise<CommunityPages>} - The community page
   * @throws {Error} - If an error occurs while fetching the community page
   */
  async getCommunityPage(communityId, pageId) {
    try {
      return await CommunityPages.findOne({ community_name: communityId, page_id: pageId });
    } catch (error) {
      throw new Error('Error fetching community page: ' + error.message);
    }
  }

  /**
   * Retrieves all community pages for a given community
   *
   * @param {string} communityId - The unique identifier of the community to retrieve the pages from
   * @returns {Promise<CommunityPages[]>} - An array of community pages
   * @throws {Error} - If an error occurs while fetching the community pages
   */
  async getAllCommunityPages(communityId) {
    try {
      return await CommunityPages.find({ community_name: communityId });
    } catch (error) {
      throw new Error('Error fetching community pages: ' + error.message);
    }
  }


  /**
   * Deletes all community pages for a given community
   *
   * @param {string} communityId - The unique identifier of the community to delete the pages from
   * @returns {Promise<Document>} - The result of the deletion operation
   * @throws {Error} - If an error occurs while deleting the community pages
   */
  async deleteAllCommunityPages(communityId) {
    try {
      return await CommunityPages.deleteMany({ community_name: communityId });
    } catch (error) {
      throw new Error('Error deleting community pages: ' + error.message);
    }
  }

  /**
   * Approves a community page by its ID using the provided data
   *
   * @param {string} communityId - The unique identifier of the community to approve the page from
   * @param {string} pageId - The unique identifier of the page to approve
   * @param {string} admin_id - The unique identifier of the admin approving the page
   * @returns {Promise<CommunityPages>} - The approved community page
   * @throws {Error} - If an error occurs while approving the community page
   */
  async approveCommunityPage(communityId, pageId, admin_id) {
    try {
        return await CommunityPages.findOneAndUpdate(
            { community_name: communityId, page_id: pageId },
            { page_state: 'APPROVED', admin_state: 'APPROVER', approved_by: admin_id },
            { new: true }
        );
    } catch (error) {
        throw new Error('Error approving community page: ' + error.message);
    }
}


  /**
   * Rejects a community page by its ID using the provided data
   *
   * @param {string} communityId - The unique identifier of the community to reject the page from
   * @param {string} pageId - The unique identifier of the page to reject
   * @param {string} admin_id - The unique identifier of the admin rejecting the page
   * @returns {Promise<CommunityPages>} - The rejected community page
   * @throws {Error} - If an error occurs while rejecting the community page
   */
  async rejectCommunityPage(communityId, pageId, admin_id) {
    try {
      return await CommunityPages.findOneAndUpdate(
        { community_name: communityId, page_id: pageId },
        { page_state: 'REJECTED', admin_state: 'REJECTOR', rejected_by: admin_id },
        { new: true }
      );
    } catch (error) {
      throw new Error('Error rejecting community page: ' + error.message);
    }
  }
}

module.exports = new CommunityPagesDAO();
