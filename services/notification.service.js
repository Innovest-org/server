const NotificationDAO = require('../common/daos/notification.dao');
const Admin = require('../db/models/adminModel');
const { getIo } = require('../config/socket');

class NotificationService {

  /**
   * Creates a new notification for the given user with the given type and data.
   * Sends the notification to the user using socket.io.
   * @param {string} userId - The ID of the user to notify.
   * @param {string} type - The type of the notification.
   * @param {Object} data - The data for the notification.
   * @returns {Promise<Notification>} - The newly created notification.
   * @throws {Error} - If an error occurs while creating the notification.
   */
  async createNotification(userId, type, data) {
    try {
      const notificationData = { user_id: userId, type: type, data: data };
      const notification = await NotificationDAO.createNotification(notificationData);
      getIo().to(userId.toString()).emit('new_notification', notification);
      return notification;
    } catch (error) {
      throw new Error('Error creating notification: ' + error.message);
    }
  }

  /**
   * Notifies a user with a notification of the given type and data.
   * @param {string} userId - The ID of the user to notify.
   * @param {string} type - The type of the notification.
   * @param {Object} data - The data for the notification.
   * @returns {Promise<Notification>} - The created notification.
   */
  async notifyUser(userId, type, data) {
    return this.createNotification(userId, type, data);
  }

  /**
   * Notifies an admin user with a notification of the given type and data.
   * @param {string} adminId - The ID of the admin user to notify.
   * @param {string} type - The type of the notification.
   * @param {Object} data - The data for the notification.
   * @returns {Promise<Notification>} - The created notification.
   * @throws {Error} - If the admin user could not be found or the notification could not be created.
   */

  /**
   * Notifies an admin user with a notification of the given type and data.
   * @param {string} adminId - The ID of the admin user to notify.
   * @param {string} type - The type of the notification.
   * @param {Object} data - The data for the notification.
   * @returns {Promise<Notification>} - The created notification.
   * @throws {Error} - If the admin user could not be found or the notification could not be created.
   */
  async notifyAdmin(adminId, type, data) {
    try {
      const admin = await Admin.findOne({admin_id: adminId});
      if (!admin) {
        throw new Error('Admin not found');
      }
      return this.createNotification(admin.admin_id, type, data);
    } catch (error) {
      throw new Error('Error notifying admin: ' + error.message);
    }
  }

  /**
   * Retrieves all notifications for a user.
   * @param {string} userId - The ID of the user to retrieve notifications for.
   * @returns {Promise<Notification[]>} - A list of all notifications for the user or an empty array if an error occurs.
   */
  async getNotificationsForUser(userId) {
    try {
      return await NotificationDAO.getNotificationsForUser(userId);
    } catch (error) {
      console.error('Error getting notifications:', error);
      return [];
    }
  }


 /**
   * Marks a notification as read.
   * @param {string} notification_id - The ID of the notification to be marked as read.
   * @returns {Promise<Object>} - The updated notification.
   * @throws {Error} If the notification couldn't be marked as read.
   */
 async markNotificationAsRead(notification_id) {
    try {
      return await notification_id.markAsRead(notification_id);
    } catch (error) {
      throw new Error('Failed to mark notification as read: ' + error.message);
    }
  }


  /**
   * Deletes a notification.
   * @param {string} notification_id - The ID of the notification to be deleted.
   * @returns {Promise<Object>} - The deleted notification.
   * @throws {Error} If the notification couldn't be deleted.
   */
  async deleteNotification(notification_id) {
    try {
      return await NotificationDao.deleteNotification(notification_id);
    } catch (error) {
      throw new Error('Failed to delete notification: ' + error.message);
    }
  }


  /**
   * Retrieves all notifications for a specific user.
   * @param {string} userId - The ID of the user whose notifications are being retrieved.
   * @returns {Promise<Object[]>} - The list of notifications.
   * @throws {Error} If notifications couldn't be retrieved.
   */
  async getNotificationsByUser(userId) {
    try {
      return await NotificationDAO.getNotificationsByUser(userId);
    } catch (error) {
      throw new Error('Failed to fetch notifications: ' + error.message);
    }
  }


  /**
   * Retrieves a single notification by ID.
   * @param {string} notification_id - The ID of the notification to be retrieved.
   * @returns {Promise<Object>} - The notification data.
   * @throws {Error} If the notification couldn't be retrieved.
   */
  async getNotificationById(notification_id) {
    try {
      return await notification_id.getNotificationById(notification_id);
    } catch (error) {
      throw new Error('Failed to fetch notification: ' + error.message);
    }
  }


}

module.exports = new NotificationService();

