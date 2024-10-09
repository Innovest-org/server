const NotificationService = require('../services/notification.service');


/**
 * NotificationController class handles HTTP requests related to notifications.
 * It interacts with the NotificationService to perform operations and send responses.
 */
class NotificationController {
  /**
   * Creates a new notification.
   * @param {Object} req - The request object containing notification data.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Sends the created notification as a response.
   */
  async createNotification(req, res) {
    try {
      const notificationData = req.body;
      const newNotification = await NotificationService.createNotification(notificationData);
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create notification: ' + error.message });
    }
  }


  /**
   * Marks a notification as read.
   * @param {Object} req - The request object containing notification ID.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Sends the updated notification as a response.
   */
  async markNotificationAsRead(req, res) {
    try {
      const { notification_id } = req.params;
      const updatedNotification = await NotificationService.markNotificationAsRead(notification_id);
      res.status(200).json(updatedNotification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark notification as read: ' + error.message });
    }
  }


  /**
   * Deletes a notification.
   * @param {Object} req - The request object containing notification ID.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Sends the deleted notification as a response.
   */
  async deleteNotification(req, res) {
    try {
      const { notification_id } = req.params;
      const deletedNotification = await NotificationService.deleteNotification(notification_id);
      res.status(200).json(deletedNotification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete notification: ' + error.message });
    }
  }


  /**
   * Retrieves all notifications for a specific user.
   * @param {Object} req - The request object containing user ID.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Sends the list of notifications as a response.
   */
  async getNotificationsByUser(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await NotificationService.getNotificationsByUser(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notifications: ' + error.message });
    }
  }


  /**
   * Retrieves a single notification by ID.
   * @param {Object} req - The request object containing notification ID.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - Sends the notification as a response.
   */
  async getNotificationById(req, res) {
    try {
      const { notification_id } = req.params;
      const notification = await NotificationService.getNotificationById(notification_id);
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notification: ' + error.message });
    }
  }
}


module.exports = new NotificationController();
