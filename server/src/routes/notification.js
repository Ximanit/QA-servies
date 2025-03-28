const { Router } = require('express');
const notificationController = require('../controllers/Notification');

const router = Router();

router.get('/', notificationController.getUserNotifications);
router.put('/read/:ticketId', notificationController.markNotificationsAsRead);

module.exports = router;
