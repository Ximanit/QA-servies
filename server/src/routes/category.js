const Router = require('express');
const router = new Router();
const controller = require('../controllers/Category');

router
	.route('/')
	.post(controller.createCategory) // Создание ответа
	.get(controller.getcategory); // Получение всех ответов

router
	.route('/:id')
	.get(controller.getCategoryById) // Получение ответа по ID
	.put(controller.updateCategory) // Обновление ответа
	.delete(controller.deleteProfile); // Удаление ответа

module.exports = router;
