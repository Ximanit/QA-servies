// server/src/routes/message.js
const Router = require('express');
const router = new Router();
const { io } = require('../../index'); // Импортируем io
const controllerFactory = require('../controllers/Message'); // Импортируем как фабричную функцию
const authMiddleware = require('../middleware/authMiddleware');

const controller = controllerFactory(io); // Создаём контроллер с io

router.use(authMiddleware);

router.route('/').post(controller.createMessage);
router.route('/:ticketId').get(controller.getMessages);

module.exports = router;
