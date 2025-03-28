const { Router } = require('express');
const router = Router();
const notificationController = require('../controllers/Notification');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', notificationController.getUserNotifications);
router.put('/read/:ticketId', notificationController.markNotificationsAsRead);

module.exports = router;
