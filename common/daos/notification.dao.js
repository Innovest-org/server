const Notification = require('../../db/models/notificationModel');


/**
 * NotificationDao class provides methods for interacting with notification data.
 * It performs CRUD operations and handles interactions with the Notification model.
 */
class NotificationDao {
  /**
   * Creates a new notification with the given data.
   * @param {Object} notificationData - The notification data to be stored in the database.
   * @returns {Promise<Notification>} - The newly created notification.
   * @throws {Error} If the notification couldn't be created.
   */
  async createNotification(notificationData) {
    try {
      const notification = new Notification(notificationData);
      return await notification.save();
    } catch (error) {
      throw new Error('Error creating notification: ' + error.message);
    }
  }


  /**
   * Updates the notification with the given id with the provided data.
   * @param {string} notification_id - The id of the notification to be updated.
   * @param {Object} updateData - The new data to update the notification with.
   * @returns {Promise<Notification>} - The updated notification.
   * @throws {Error} If the notification couldn't be updated.
   */
  async updateNotification(notification_id, updateData) {
    try {
      const updatedNotification = await Notification.findOneAndUpdate(
        { notification_id: notification_id },
        updateData,
        { new: true, runValidators: true }
      );


      if (!updatedNotification) {
        throw new Error('Notification not found');
      }


      return updatedNotification;
    } catch (error) {
      throw new Error('Error updating notification: ' + error.message);
    }
  }


  /**
   * Marks the notification as read.
   * @param {string} notification_id- The id of the notification to be marked as read.
   * @returns {Promise<Notification>} - The updated notification.
   * @throws {Error} If the notification couldn't be marked as read.
   */
  async markAsRead(notification_id) {
    try {
      const notification = await this.updateNotification(notification_id, { read_status: true });
      return notification;
    } catch (error) {
      throw new Error('Error marking notification as read: ' + error.message);
    }
  }


  /**
   * Deletes the notification with the given id.
   * @param {string} notification_id - The id of the notification to be deleted.
   * @returns {Promise<Notification>} - The deleted notification.
   * @throws {Error} If the notification couldn't be deleted.
   */
  async deleteNotification(notification_id) {
    try {
      const deletedNotification = await Notification.findOneAndDelete({ notification_id: notification_id });
      if (!deletedNotification) {
        throw new Error('Notification not found');
      }
      return deletedNotification;
    } catch (error) {
      throw new Error('Error deleting notification: ' + error.message);
    }
  }


  /**
   * Retrieves all notifications for a specific user.
   * @param {string} userId - The id of the user whose notifications are to be retrieved.
   * @returns {Promise<Notification[]>} - A list of notifications for the user.
   * @throws {Error} If the notifications couldn't be fetched.
   */
  async getNotificationsByUser(userId) {
    try {
      return await Notification.find({ user_id: userId });
    } catch (error) {
      throw new Error('Error fetching notifications: ' + error.message);
    }
  }


  /**
   * Retrieves a notification by its ID.
   * @param {string} notification_id- The id of the notification to be retrieved.
   * @returns {Promise<Notification>} - The notification with the given ID.
   * @throws {Error} If the notification couldn't be fetched.
   */
  async getNotificationById(notification_id) {
    try {
      return await Notification.findOne({ notification_id: notification_id });
    } catch (error) {
      throw new Error('Error fetching notification: ' + error.message);
    }
  }
}


module.exports = new NotificationDao();
