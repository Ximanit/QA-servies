const Router = require('express');
const router = new Router();
const controller = require('../controllers/Profile');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router
	.route('/')
	.post(controller.createProfile) // Создание ответа
	.get(controller.getProfile); // Получение всех ответов

router
	.route('/:id')
	.get(controller.getProfileById) // Получение ответа по ID
	.put(controller.updateProfile) // Обновление ответа
	.delete(controller.deleteProfile); // Удаление ответа

module.exports = router;
