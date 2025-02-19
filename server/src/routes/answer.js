const Router = require('express');
const router = new Router();
const controller = require('../controllers/Answer');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router
	.route('/')
	.post(controller.createAnswer) // Создание ответа
	.get(controller.getAnswers); // Получение всех ответов

router
	.route('/:id')
	.get(controller.getAnswerById) // Получение ответа по ID
	.put(controller.updateAnswer) // Обновление ответа
	.delete(controller.deleteAnswer); // Удаление ответа

router.route('/question/:questionId').get(controller.getAnswerByQuestionId);

module.exports = router;
