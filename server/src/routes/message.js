// server/src/routes/message.js
const Router = require('express');
const router = new Router();
const controller = require('../controllers/Message');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.route('/').post(controller.createMessage);
router.route('/:ticketId').get(controller.getMessages);

module.exports = router;
