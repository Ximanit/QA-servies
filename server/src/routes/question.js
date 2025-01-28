const Router = require('express');
const router = new Router();
const controller = require('../controllers/Question');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router
	.route('/')
	.post(controller.createQuestion) // Создание вопроса
	.get(controller.getQuestions); // Получение всех вопросов

router
	.route('/:id')
	.get(controller.getQuestionById) // Получение вопроса по ID
	.put(controller.updateQuestion) // Обновление вопроса
	.delete(controller.deleteQuestion); // Удаление вопроса

module.exports = router;
