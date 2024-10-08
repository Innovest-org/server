const Page = require('../../db/models/pageModel');
const CommunityPages = require('../../db/models/communityPagesModel');
const Community = require('../../db/models/communityModel');
const { validateCreatePage, validateUpdatePage } = require('../../db/validators/pageValidator');

class PageDAO {
  /**
   * Creates a new page.
   * @param {Object} pageData - Data for the new page.
   * @param {String} userId - ID of the user creating the page.
   * @returns {Promise<Page>} - The newly created page document.
   */
  async createPage(pageData, userId) {
    try {
      const page = new Page({
        ...pageData,
        author: userId,
      });
      return await page.save();
    } catch (error) {
      throw new Error('Error creating page: ' + error.message);
    }
  }

  /**
   * Updates a page.
   * @param {String} pageId - ID of the page to update.
   * @param {Object} pageData - Data to update the page with.
   * @param {String} userId - ID of the user updating the page.
   * @returns {Promise<Page>} - The updated page document.
   */
  async updatePage(pageId, pageData, userId) {
    const { error } = validateUpdatePage(pageData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    try {
      const updatedPage = await Page.findOneAndUpdate(
        { page_id: pageId, author: userId },
        { $set: pageData },
        { new: true }
      );

      if (!updatedPage) {
        throw new Error('Page not found or not authorized to update');
      }

      return updatedPage;
    } catch (error) {
      throw new Error('Error updating page: ' + error.message);
    }
  }

  /**
   * Deletes a page.
   * @param {String} pageId - ID of the page to delete.
   * @param {String} userId - ID of the user deleting the page.
   * @returns {Promise<Boolean>} - True if the page was deleted successfully.
   * @throws {Error} If the page could not be deleted.
   */
  async deletePage(pageId, userId) {
    try {
      const deletedPage = await Page.findOneAndDelete({ page_id: pageId, author: userId });
      if (!deletedPage) {
        throw new Error('Page not found or not authorized to delete');
      }
      return true;
    } catch (error) {
      throw new Error('Error deleting page: ' + error.message);
    }
  }

  /**
   * Gets all approved pages of a community.
   * @param {String} communityId - ID of the community to get pages from.
   * @returns {Promise<Page[]>} - Array of approved pages.
   * @throws {Error} If error occurs while getting pages.
   */
  async getPagesByCommunity(communityId) {
    try {
      return await Page.find({ community_id: communityId, page_status: 'APPROVED' });
    } catch (error) {
      throw new Error('Error getting pages by community: ' + error.message);
    }
  }

  /**
   * Gets a page by its ID.
   * @param {String} pageId - ID of the page to get.
   * @returns {Promise<Page>} - The page document if found.
   * @throws {Error} If the page could not be fetched.
   */
  async getPageById(pageId) {
    try {
      return await Page.findOne({ page_id: pageId });
    } catch (error) {
      throw new Error('Error getting page by ID: ' + error.message);
    }
  }

  /**
   * Retrieves all pending pages of all communities.
   * @returns {Promise<CommunityPages[]>} - Array of pending community pages.
   * @throws {Error} If an error occurs while fetching the pending pages.
   */
  async getPendingPages() {
    try {
      return await CommunityPages.find({ page_status: 'PENDING' });
    } catch (error) {
      throw new Error('Error getting pending pages: ' + error.message);
    }
  }

  /**
   * Approves a pending page to be added to a community.
   * @param {String} communityId - ID of the community to add the page to.
   * @param {String} pageId - ID of the page to add.
   * @param {String} adminId - ID of the admin approving the page.
   * @returns {Promise<CommunityPages>} - The updated community page document with the approved status.
   * @throws {Error} If an error occurs while approving the page.
   */
  async approvePageToAddCommunity(communityId, pageId, adminId) {
    try {
      const updatedCommunityPage = await CommunityPages.findOneAndUpdate(
        { community_id: communityId, page_id: pageId, page_status: 'PENDING' },
        { $set: { page_status: 'APPROVED', approved_by: adminId } },
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

      console.log('Successfully approved page:', { communityId, pageId });
      return updatedCommunityPage; // Return the updated community page entry
    } catch (error) {
      throw new Error(`Error approving page to add to community: ${error.message}`);
    }
  }

  /**
   * Rejects a pending page to be added to a community.
   * @param {String} communityId - ID of the community to reject the page from.
   * @param {String} pageId - ID of the page to reject.
   * @param {String} adminId - ID of the admin rejecting the page.
   * @returns {Promise<CommunityPages>} - The updated community page document with the rejected status.
   * @throws {Error} If an error occurs while rejecting the page.
   */
  async rejectPageToAddCommunity(communityId, pageId, adminId) {
    try {
      return await CommunityPages.findOneAndUpdate(
        { community_id: communityId, page_id: pageId },
        { $set: { page_status: 'REJECTED', approved_by: adminId } },
        { new: true }
      );
    } catch (error) {
      throw new Error('Error rejecting page: ' + error.message);
    }
  }

  /**
   * Removes a page from a community.
   * @param {String} communityId - ID of the community to remove the page from.
   * @param {String} pageId - ID of the page to remove.
   * @param {String} userId - ID of the user removing the page.
   * @param {Boolean} isAdmin - Whether the user is an admin or not.
   * @returns {Promise<Object>} - An object containing a success message if the page is removed successfully.
   * @throws {Error} If an error occurs while removing the page.
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

      const page = await Page.findOne({ page_id: pageId });
      if (page.author.toString() !== userId && !isAdmin) {
        throw new Error(`User with ID: ${userId} is not authorized to remove this page.`);
      }

      await Page.findOneAndDelete({ page_id: pageId });
      await CommunityPages.findOneAndDelete({ page_id: pageId });

      console.log('Successfully removed page from community');
      return { message: 'Page removed from community successfully' };
    } catch (error) {
      throw new Error('Error removing page from community: ' + error.message);
    }
  }
}

module.exports = new PageDAO();
