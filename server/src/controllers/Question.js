const Question = require('../models/Question');
const Answer = require('../models/Answer');
const boom = require('@hapi/boom'); // Импорт boom

module.exports = {
	async createQuestion(req, res, next) {
		try {
			const { title, description, category } = req.body;
			if (!title || !description) {
				throw boom.badRequest('Заголовок и описание обязательны');
			}
			const author = req.user.id;
			const question = new Question({ title, description, category, author });
			await question.save();
			logger.info('Вопрос успешно создан', { question });
			res.status(201).json(question);
		} catch (error) {
			logger.error('Ошибка создания вопроса', {
				error: error.message,
				stack: error.stack,
			});
			next(error); // Передаем ошибку в middleware обработки ошибок
		}
	},

	async getQuestions(req, res, next) {
		try {
			const questions = await Question.find().populate('author', 'username');
			logger.info('Список вопросов успешно получен', { questions });
			res.status(200).json(questions);
		} catch (error) {
			logger.error('Ошибка получения списка вопросов', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getQuestionById(req, res, next) {
		try {
			const question = await Question.findById(req.params.id)
				.populate('author', 'username')
				.populate({
					path: 'answers',
					populate: { path: 'author', select: 'username' },
				});
			if (!question) {
				throw boom.notFound('Вопрос не найден');
			}
			logger.info('Вопрос по id успешно получен', { question });
			res.status(200).json(question);
		} catch (error) {
			logger.error('Ошибка получения вопроса по id', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async updateQuestion(req, res, next) {
		try {
			const { title, description, category } = req.body;
			if (!title || !description) {
				throw boom.badRequest('Заголовок и описание обязательны');
			}
			const question = await Question.findByIdAndUpdate(
				req.params.id,
				{ title, description, category },
				{ new: true }
			);
			if (!question) {
				throw boom.notFound('Вопрос не найден');
			}
			logger.info('Вопрос успешно обновлен', { question });
			res.status(200).json(question);
		} catch (error) {
			logger.error('Ошибка обновления вопроса', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async deleteQuestion(req, res, next) {
		try {
			const question = await Question.findByIdAndDelete(req.params.id);
			if (!question) {
				throw boom.notFound('Вопрос не найден');
			}
			logger.info('Вопрос успешно удален', { question });
			res.status(200).json({ message: 'Вопрос успешно удален' });
		} catch (error) {
			logger.error('Ошибка удаления вопроса', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},
};
