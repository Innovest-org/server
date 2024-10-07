const Page = require('../../db/models/pageModel');
const CommunityPages = require('../../db/models/communityPagesModel');
const Community = require('../../db/models/communityModel');
const { validateCreatePage, validateUpdatePage } = require('../../db/validators/pageValidator');

class PageDAO {
  /**
   * Creates a new page in the database
   * @param {Object} pageData - Page data to be saved in the database
   * @returns {Promise<Page>} - The newly created page
   */
  async createPage(pageData) {
    const { error } = validateCreatePage(pageData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    try {
      const page = new Page(pageData);
      return await page.save();
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
    const { error } = validateUpdatePage(pageData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    try {
      const updatedPage = await Page.findOneAndUpdate(
        { page_id: pageId },
        { $set: pageData },
        { new: true }
      );

      if (!updatedPage) {
        throw new Error('Page not found');
      }

      return updatedPage;
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
      const deletedPage = await Page.findOneAndDelete({ page_id: pageId });
      if (!deletedPage) {
        throw new Error('Page not found');
      }
      return true;
    } catch (error) {
      throw new Error('Error deleting page: ' + error.message);
    }
  }

  /**
   * Retrieves all approved pages of a community
   * @param {string} communityId - ID of the community to retrieve the pages of
   * @returns {Promise<Page[]>} - The approved pages of the community
   * @throws {Error} - If an error occurs while fetching the pages
   */
  async getPageByCommunity(communityId) {
    try {
      return await Page.find({ community_id: communityId, page_state: 'APPROVED' });
    } catch (error) {
      throw new Error('Error getting pages by community: ' + error.message);
    }
  }

  /**
   * Retrieves a page by its ID
   * @param {string} pageId - ID of the page to retrieve
   * @returns {Promise<Page>} - The page with the given ID
   * @throws {Error} - If an error occurs while fetching the page
   */
  async getPageById(pageId) {
    try {
      return await Page.findOne({ page_id: pageId });
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
      return await CommunityPage.find({ page_status: 'PENDING' });
    } catch (error) {
      throw new Error('Error getting pending pages: ' + error.message);
    }
  }

  /**
   * Adds a page to a community's pending pages list
   * @param {string} communityId - The unique id of the community to add the page to
   * @param {string} pageId - The unique id of the page to add
   * @returns {Promise<object>} - The updated community page or an error message
   * @throws {Error} - If an error occurs while updating the community
   */
  async addUserToPendingPages(communityId, pageId) {
    try {
      const existingPage = await CommunityPage.findOne({
        community_id: communityId,
        page_id: pageId,
      });

      if (existingPage) {
        console.log(`page with ID: ${pageId} is already in community with ID: ${communityId}`);
        return {
          message: `page is already approved.`,
          communityPage: existingPage,
        };
      }
      const communityPageEntry = new CommunityPages({
        page_id: pageId,
        community_id: communityId,
        page_status: 'PENDING',
      });
      return await communityPageEntry.save();
    } catch (error) {
      console.error('Error adding page to pending pages:', error);
      throw new Error('Error adding page to pending pages: ' + error.message);
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
      const updatedCommunityPage = await CommunityPages.findOneAndUpdate(
        { community_id: communityId, page_id: { $in: pageId }, page_state: 'PENDING' },
        { $set: { page_state: 'APPROVED', approved_by: admin_id } },
        { new: true }
      );
      if (!updatedCommunityPage) {
        throw new Error(`No pending page found in community with ID: ${communityId}`);
      }

      const community = await Community.findOneAndUpdate(
        { community_id: communityId },
        { $addToSet: { pages: pageId }, $inc: { page_count: 1 } },
        { new: true }
      );
      if (!community) {
        throw new Error(`Community not found with ID: ${communityId}`);
      }
      if (!updatePageCommunities) {
        throw new Error(`Page not found with ID: ${pageId}`);
      }

      console.log('Successfully approved page:', { communityId, pageId });
      return community;
    } catch (error) {
      throw new Error(`Error approving page to add community: ` + error.message);
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
      return await CommunityPages.findOneAndUpdate(
        { community_id: communityId, page_id: pageId },
        { $set: { page_state: 'REJECTED', admin_id: admin_id } },
        { new: true }
      );
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
      const removedPage = await CommunityPages.findOneAndDelete({
        community_id: communityId,
        page_id: pageId
      });

      if (!removedPage) {
        throw new Error(`Page with ID: ${pageId} not found in community with ID: ${communityId}`);
      }

      const updatedCommunity = await Community.findOneAndUpdate(
        { community_id: communityId },
        { $pull: { pages: pageId }, $inc: { page_count: -1 } },
        { new: true }
      );

      if (!updatedCommunity) {
        throw new Error(`Community with ID: ${communityId} not found`);
      }

      console.log('Successfully removed page from community:', { communityId, pageId });

      if (Page.author.toString() !== userId && !isAdmin) {
        throw new Error(`User with ID: ${userId} is not authorized to remove this page.`);
      }

      await Page.findOneAndDelete({ page_id: pageId });
      await CommunityPages.findOneAndDelete({ page_id: pageId });

      console.log('Successfully removed page from community');
      return { message: `Page removed from community successfully` };
    } catch (error) {
      throw new Error('Error removing page from community: ' + error.message);
    }
  }
}

module.exports = new PageDAO();
