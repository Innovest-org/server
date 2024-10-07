const PageService = require('../services/page.service');

class PageController {
  constructor(io) {
    this.io = io; // Initialize Socket.IO instance
  }

  async createPage(req, res) {
    try {
      const pageData = req.body;
      const page = await PageService.createPage(pageData);
      this.io.emit('pageCreated', page); // Emit event for real-time update
      res.status(201).json(page);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updatePage(req, res) {
    try {
      const updatedPage = await PageService.updatePage(req.params.page_id, req.body);
      if (!updatedPage) return res.status(404).json({ message: 'Page not found' });
      this.io.emit('pageUpdated', updatedPage); // Emit event for real-time update
      res.status(200).json(updatedPage);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletePage(req, res) {
    try {
      const { page_id } = req.params;
      const deleted = await PageService.deletePage(page_id);
      if (!deleted) return res.status(404).json({ message: 'Page not found' });
      this.io.emit('pageDeleted', page_id); // Emit event for real-time update
      res.status(200).json({ message: 'Page deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPageById(req, res) {
    try {
      const { page_id } = req.params;
      const page = await PageService.getPageById(page_id);
      if (!page) return res.status(404).json({ message: 'Page not found' });
      res.status(200).json(page);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPendingPages(req, res) {
    try {
      const pendingPages = await PageService.getPendingPages();
      res.status(200).json(pendingPages);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async addPageToPending(req, res) {
    try {
      const { community_id, page_id } = req.params;
      const page = await PageService.addPageToPendingPages(community_id, page_id);
      this.io.emit('pagePending', page); // Emit event for real-time update
      res.status(200).json(page);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async approvePageToAddCommunity(req, res) {
    try {
      const { community_id, page_id } = req.params;
      const { admin_id } = req.user;

      const page = await PageService.approvePageToAddCommunity(community_id, page_id, admin_id);
      this.io.emit('pageApproved', page); // Emit event for real-time update
      res.status(200).json(page);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async rejectPageToAddCommunity(req, res) {
    try {
      const { community_id, page_id } = req.params;
      const { admin_id } = req.user;

      const page = await PageService.rejectPageToAddCommunity(community_id, page_id, admin_id);
      this.io.emit('pageRejected', page); // Emit event for real-time update
      res.status(200).json(page);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async removePageFromCommunity(req, res) {
    const { community_id, page_id, user_id } = req.params;
    const authenticatedUserId = req.user.id;
    const userRole = req.user.role;

    const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'ADMIN';

    if (!isAdmin && authenticatedUserId !== user_id) {
      return res.status(403).json({ message: 'Forbidden: You can only remove your pages from the community' });
    }
    try {
      const removedPages = await PageService.removePageFromCommunity(community_id, page_id, user_id, isAdmin);
      this.io.emit('pageRemoved', { community_id, page_id }); // Emit event for real-time update
      res.status(200).json(removedPages);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = (io) => new PageController(io);
