const Community = require('../db/models/communityModel');
const PageService = require('../services/page.service');
const { getIo } = require('../config/socket');
const Page = require('../db/models/pageModel');

class PageController {

  /**
   * Creates a new page in a community with the given community ID and pending status.
   * The page is created with the data provided in the request body.
   * @param {Object} req - The HTTP request object containing the community ID in the params and page data in the body.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with a 201 status code if successful, a 404 status code if the community was not found, or a 500 status code if an error occurred.
   */
  async createPage(req, res) {
    try {
      const userId = req.user.id;
      const communityId = req.params.community_id;
      const pageData = req.body;

      // Fetch the community to get its admins
      const community = await Community.findOne({ community_id: communityId });

      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      const adminId = community.admins[0];
      const page = await PageService.createPage(pageData, communityId, userId, adminId);

      getIo().to(communityId).emit('newPendingPage', page);

      return res.status(201).json({ message: 'Page created successfully and added to community as pending.', page });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Updates a page identified by the given ID.
   * @param {Object} req - The HTTP request object containing the page ID in the params and updated page data in the body.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with the updated page or an error message.
   * @throws {Error} - If an error occurs while updating the page.
   */
  async updatePage(req, res) {
    try {
      const userId = req.user.id;
      const pageId = req.params.pageId;
      const pageData = req.body; // Updated page data from request body
      const updatedPage = await PageService.updatePage(pageId, pageData, userId);
      const adminId = community.admins[0];
      const page = await PageService.createPage(pageData, communityId, userId, adminId);
      getIo().to(communityId).emit('newUpdatedPage', updatedPage);
      return res.status(200).json({ message: 'Page updated successfully', updatedPage });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Deletes a page identified by the given ID.
   * @param {Object} req - The HTTP request object containing the page ID in the params.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with a 204 status code if successful or an error message.
   * @throws {Error} - If an error occurs while deleting the page.
   */
  async deletePage(req, res) {
    try {
      const userId = req.user.id;
      const pageId = req.params.pageId;
      await PageService.deletePage(pageId, userId);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Retrieves a page by its ID.
   * @param {Object} req - The HTTP request object containing the page ID in the params.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with the page or an error message.
   */
  async getPageById(req, res) {
    try {
      const pageId = req.params.pageId;
      const page = await PageService.getPageById(pageId);
      return res.status(200).json(page);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Retrieves all pending pages.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with a list of pending pages or an error message.
   */
  async getPendingPages(req, res) {
    try {
      const pendingPages = await PageService.getPendingPages();
      return res.status(200).json(pendingPages);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Retrieves all pages in a community.
   * @param {Object} req - The HTTP request object containing the community ID in the params.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with a list of pages or an error message.
   */
  async getPagesByCommunity(req, res) {
    try {
      const communityId = req.params.communityId;
      const pages = await PageService.getPagesByCommunity(communityId);
      return res.status(200).json(pages);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }


  /**
   * Approves a page to be added to a community.
   * @param {Object} req - The request object containing the community ID and page ID in the params.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Responds with a 200 status code if successful or an error message.
   */

  async approvePage(req, res) {
    try {
      const { community_id, page_id } = req.params;
      const adminId = req.user.id;
      const page = await Page.findOne({ page_id: page_id });

      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }
      const userId = page.author;
      const updatedCommunity = await PageService.approvePageToAddCommunity(community_id, page_id, adminId, userId);

      getIo().to(community_id).emit('pageApproved', page);
      return res.status(200).json({ message: 'Page approved successfully', updatedCommunity });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Rejects a page from being added to a community.
   * @param {Object} req - The request object containing the community ID and page ID in the params.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Responds with a 204 status code if successful or an error message.
   */
  async rejectPage(req, res) {
    try {
      const { communityId, pageId } = req.params;
      const adminId = req.user.id;
      await PageService.rejectPageToAddCommunity(communityId, pageId, adminId);
      return res.status(204).send(); // No content
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Removes a page from a community.
   * @param {Object} req - The request object containing the community ID and page ID in the params.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Responds with a 204 status code if successful or an error message.
   * @throws {Error} - If an error occurs while removing the page.
   */
  async removePageFromCommunity(req, res) {
    try {
      const { communityId, pageId } = req.params;
      const userId = req.user.id; // Assuming user ID is stored in the request
      const isAdmin = req.user.role === 'admin'; // Check if user is an admin
      await PageService.removePageFromCommunity(communityId, pageId, userId, isAdmin);
      return res.status(204).send(); // No content
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PageController();
