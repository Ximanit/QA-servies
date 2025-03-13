const Answer = require('../models/Answer');
const Question = require('../models/Question');
const boom = require('@hapi/boom');
const logger = require('../logger');

module.exports = {
	async createAnswer(req, res, next) {
		try {
			const { questionId, content } = req.body;
			if (!questionId || !content) {
				throw boom.badRequest('Необходимо указать questionId и content');
			}
			const author = req.user.id;

			const question = await Question.findById(questionId);
			if (!question) {
				throw boom.notFound('Вопрос не найден');
			}

			const answer = new Answer({ question: questionId, content, author });
			await answer.save();
			logger.info('Ответ успешно создан', { answerId: answer._id, author });
			res.status(201).json(answer);
		} catch (error) {
			logger.error('Ошибка создания ответа', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getAnswers(req, res, next) {
		try {
			const answers = await Answer.find()
				.populate('author', 'username')
				.populate('question', 'title');
			logger.info('Ответы получен', { answers });
			res.status(200).json(answers);
		} catch (error) {
			logger.error('Ошибка получения ответов', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getAnswerById(req, res, next) {
		try {
			const answer = await Answer.findById(req.params.id)
				.populate('author', 'username')
				.populate('question', 'title');
			if (!answer) {
				throw boom.notFound('Ответ не найден');
			}
			logger.info('Ответ получен по id ответа', { answer });
			res.status(200).json(answer);
		} catch (error) {
			logger.error('Ошибка получения ответа по id ответа', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getAnswerByQuestionId(req, res, next) {
		try {
			const answer = await Answer.find({ question: req.params.questionId });
			if (!answer) {
				throw boom.notFound('Ответ не найден');
			}
			logger.info('Ответ получен  по id вопроса', { answer });
			res.status(200).json(answer);
		} catch (error) {
			logger.error('Ошибка получения ответа по id вопроса', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async updateAnswer(req, res, next) {
		try {
			const { content } = req.body;
			if (!content) {
				throw boom.badRequest('Необходимо указать content');
			}
			const answer = await Answer.findByIdAndUpdate(
				req.params.id,
				{ content },
				{ new: true }
			);
			if (!answer) {
				throw boom.notFound('Ответ не найден');
			}
			logger.info('Ответ успешно обновлен', { answer });
			res.status(200).json(answer);
		} catch (error) {
			logger.error('Ошибка обновления ответа', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async deleteAnswer(req, res, next) {
		try {
			const answer = await Answer.findByIdAndDelete(req.params.id);
			if (!answer) {
				throw boom.notFound('Ответ не найден');
			}
			logger.info('Ответ успешно удален', { answer });
			res.status(200).json({ message: 'Ответ успешно удален' });
		} catch (error) {
			logger.error('Ошибка удаления ответа', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},
};
