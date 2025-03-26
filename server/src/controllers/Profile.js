const Profile = require('../models/Profile');
const boom = require('@hapi/boom'); // Импорт boom

module.exports = {
	async createProfile(req, res, next) {
		try {
			//TODO добавить обработку массива категорий при регистрации
			const { fio } = req.body;

			const userId = req.user.id;
			const profile = new Profile({ fio, userId });
			await profile.save();
			logger.info('Поофиль успешно создан', { profile });
			res.status(201).json(profile);
		} catch (error) {
			logger.error('Ошибка создания профиля', {
				error: error.message,
				stack: error.stack,
			});
			next(error); // Передаем ошибку в middleware обработки ошибок
		}
	},

	async getProfile(req, res, next) {
		try {
			const profile = await Profile.find().populate('userId', 'username');
			logger.info('Поофиль успешно получен', { profile });
			res.status(200).json(profile);
		} catch (error) {
			logger.error('Ошибка получения профиля', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getProfileById(req, res, next) {
		try {
			const profile = await Profile.findById(req.params.id).populate(
				'userId',
				'username'
			);
			if (!profile) {
				throw boom.notFound('Вопрос не найден');
			}
			logger.info('Поофиль успешно получен по id пользователя', { profile });
			res.status(200).json(profile);
		} catch (error) {
			logger.error('Ошибка получения профиля по id пользователя', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async updateProfile(req, res, next) {
		try {
			//TODO добавить обработку массива категорий
			const { fio } = req.body;

			const profile = await Profile.findByIdAndUpdate(req.params.id, { fio });
			if (!profile) {
				throw boom.notFound('Профиль не найден');
			}
			logger.info('Профиль успешно обновлен', { profile });
			res.status(200).json(profile);
		} catch (error) {
			logger.error('Ошибка обновления профиля', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async deleteProfile(req, res, next) {
		try {
			const profile = await Profile.findByIdAndDelete(req.params.id);
			if (!profile) {
				throw boom.notFound('Профиль не найден');
			}
			logger.info('Профиль успешно удален', { profile });
			res.status(200).json({ message: 'Профиль успешно удален' });
		} catch (error) {
			logger.error('Ошибка удаления профиля', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},
};
