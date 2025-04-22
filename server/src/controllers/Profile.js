// server/src/controllers/Profile.js
const Profile = require('../models/Profile');
const boom = require('@hapi/boom');
const logger = require('../logger');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 }); // Кэш на 10 минут

module.exports = {
	async createProfile(req, res, next) {
		try {
			const { fio } = req.body;

			const userId = req.user.id;
			const profile = new Profile({ fio, userId });
			await profile.save();
			cache.del('all_profiles'); // Инвалидация кэша при создании
			logger.info('Профиль успешно создан', { profile });
			res.status(201).json(profile);
		} catch (error) {
			logger.error('Ошибка создания профиля', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getProfile(req, res, next) {
		try {
			const cacheKey = 'all_profiles';
			const cachedProfiles = cache.get(cacheKey);
			if (cachedProfiles) {
				logger.info('Профили получены из кэша', { cacheKey });
				return res.json(cachedProfiles);
			}

			const profiles = await Profile.find().populate('userId', 'username');
			cache.set(cacheKey, profiles);
			logger.info('Профили успешно получены', { profiles });
			res.status(200).json(profiles);
		} catch (error) {
			logger.error('Ошибка получения профилей', {
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
				throw boom.notFound('Профиль не найден');
			}
			logger.info('Профиль успешно получен по id пользователя', { profile });
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
			const { fio } = req.body;

			const profile = await Profile.findOneAndUpdate(
				{ userId: req.params.id },
				{ fio: fio },
				{ new: true }
			);
			if (!profile) {
				throw boom.notFound('Профиль не найден');
			}
			cache.del('all_profiles'); // Инвалидация кэша при обновлении
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
			cache.del('all_profiles'); // Инвалидация кэша при удалении
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
