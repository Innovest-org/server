const express = require('express');
const NotificationController = require('../controllers/notification.controller');


const router = express.Router();


/**
 * @route POST /notifications
 * @desc Create a new notification
 * @access Public
 */
router.post('/', NotificationController.createNotification);


/**
 * @route PATCH /notifications/:notificationId/read
 * @desc Mark a notification as read
 * @access Public
 */
router.patch('/:notificationId/read', NotificationController.markNotificationAsRead);


/**
 * @route DELETE /notifications/:notificationId
 * @desc Delete a notification
 * @access Public
 */
router.delete('/:notificationId', NotificationController.deleteNotification);


/**
 * @route GET /notifications/user/:userId
 * @desc Retrieve all notifications for a specific user
 * @access Public
 */
router.get('/user/:userId', NotificationController.getNotificationsByUser);


/**
 * @route GET /notifications/:notificationId
 * @desc Retrieve a single notification by ID
 * @access Public
 */
router.get('/:notificationId', NotificationController.getNotificationById);


module.exports = router;