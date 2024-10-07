const PageDAO = require('../common/daos/page.dao');

class PageService {

  /**
   * Creates a new page in the database
   * @param {Object} pageData - Page data to be saved in the database
   * @returns {Promise<Page>} - The newly created page
   */
  async createPage(pageData) {
    try {
      return await PageDAO.createPage(pageData);
    } catch (error) {
      throw new Error('Error creating page: ' + error.message);
    }
  }

  /**
   * Updates a page in the database
   * @param {string} pageId - ID of the page to update
   * @param {Object} pageData - Page data to be updated
   * @returns {Promise<Page>} - The updated page
   */
  async updatePage(pageId, pageData) {
    try {
      return await PageDAO.updatePage(pageId, pageData);
    } catch (error) {
      throw new Error('Error updating page: ' + error.message);
    }
  }

  /**
   * Deletes a page from the database
   * @param {string} pageId - ID of the page to delete
   * @returns {Promise<boolean>} - true if the page was deleted, false otherwise
   */
  async deletePage(pageId) {
    try {
      return PageDAO.deletePage(pageId);
    } catch (error) {
      
    }
  }

  /**
   * Retrieves a page by its ID
   * @param {string} pageId - ID of the page to retrieve
   * @throws {Error} - If an error occurs while fetching the page
   */
  async getPageById(pageId) {
    try {
      return PageDAO.getPageById(pageId);
    } catch (error) {
      throw new Error('Error getting page by ID: ' + error.message);
    }
  }

  /**
   * Retrieves all pending pages
   * @returns {Promise<Page[]>} - The pending pages
   * @throws {Error} - If an error occurs while fetching the pages
   */
  async getPendingPages() {
    try {
      return PageDAO.getPendingPages();
    } catch (error) {
      throw new Error('Error getting pending pages: ' + error.message);
    }
  }

  /**
   * Retrieves all approved pages of a community
   * @param {string} communityId - ID of the community to retrieve the pages of
   * @returns {Promise<Page[]>} - The approved pages of the community
   * @throws {Error} - If an error occurs while fetching the pages
   */
  async getPagesByCommunity(communityId) {
    try {
      return PageDAO.getPageByCommunity(communityId);
    } catch (error) {
      throw new Error('Error getting page by community: ' + error.message);
    }
  }

  /**
   * Adds a page to a community's pending pages list
   * @param {string} communityId - The unique id of the community to add the page to
   * @param {string} pageId - The unique id of the page to add
   * @returns {Promise<Object>} - The updated community page or an error message
   * @throws {Error} - If an error occurs while adding the page to the community
   */
  async addPageToPendingPages(communityId, pageId) {
    try {
      return await PageDAO.addUserToPendingPages(communityId, pageId);
    } catch (error) {
      throw new Error('Error adding user to pending pages: ' + error.message);
    }
  }

  /**
   * Approves a page to be added to a community
   * @param {string} communityId - The unique id of the community to add the page to
   * @param {string} pageId - The unique id of the page to add
   * @param {string} admin_id - The unique id of the admin who is approving the page
   * @returns {Promise<Community>} - The updated community or an error message
   * @throws {Error} - If an error occurs while updating the community
   */
  async approvePageToAddCommunity(communityId, pageId, admin_id) {
    try {
      return await PageDAO.approvePageToAddCommunity(communityId, pageId, admin_id);
    } catch (error) {
      throw new Error('Error approving page to add community: ' + error.message);
    }
  }

  /**
   * Rejects a page to be added to a community
   * @param {string} communityId - The unique id of the community to reject the page from
   * @param {string} pageId - The unique id of the page to reject
   * @param {string} admin_id - The unique id of the admin who is rejecting the page
   * @returns {Promise<CommunityPage>} - The updated community page or an error message
   * @throws {Error} - If an error occurs while rejecting the page
   */
  async rejectPageToAddCommunity(communityId, pageId, admin_id) {
    try {
      return await PageDAO.rejectPageToAddCommunity(communityId, pageId, admin_id);
    } catch (error) {
      throw new Error('Error rejecting page to add community: ' + error.message);
    }
  }

  /**
   * Removes a page from a community
   * @param {string} communityId - The unique id of the community to remove the page from
   * @param {string} pageId - The unique id of the page to remove
   * @param {string} userId - The id of the user who is removing the page
   * @param {boolean} isAdmin - Whether the user is an admin or not
   * @returns {Promise<Object>} - The result of the removal, including a message
   * @throws {Error} - If an error occurs while removing the page
   */
  async removePageFromCommunity(communityId, pageId, userId, isAdmin) {
    try {
      return await PageDAO.removePageFromCommunity(communityId, pageId, userId, isAdmin);
    } catch (error) {
      throw new Error('Error removing page from community: ' + error.message);
    }
  }
}

module.exports = new PageService();
