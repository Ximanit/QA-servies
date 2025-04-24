// server/src/controllers/Auth.js
const User = require('../models/Users');
const Roles = require('../models/Roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('../../config');
const boom = require('boom');
const logger = require('../logger');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 }); // Кэш на 10 минут

const generateAccesToken = (id, username) => {
	const payload = { id, username };
	return jwt.sign(payload, secret, { expiresIn: '24h' });
};

module.exports = {
	async registr(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw boom.badRequest('Ошибка валидации', { errors: errors.array() });
			}

			const { username, password, name } = req.body;
			const userName = name ?? 'User';

			const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (!usernameRegex.test(username)) {
				throw boom.badRequest('Некорректный формат логина');
			}

			const passwordRegex = /^.{5,}$/;
			if (!passwordRegex.test(password)) {
				throw boom.badRequest('Пароль должен содержать минимум 5 символов.');
			}

			const candidate = await User.findOne({ username });
			if (candidate) {
				throw boom.conflict(
					`Пользователь с логином ${username} уже существует`
				);
			}

			const userRole = await Roles.findOne({ value: 'USER' });
			if (!userRole) {
				throw boom.internal('Роль пользователя "USER" не найдена');
			}

			const hashPassword = await bcrypt.hash(password, 10);

			const user = new User({
				username,
				name: userName,
				password: hashPassword,
				roles: [userRole.value],
			});
			await user.save();
			logger.info('Пользователь успешно зарегистрирован', { user });
			res.status(201).json(user);
		} catch (error) {
			logger.error('Ошибка регистрации пользователя', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async login(req, res, next) {
		try {
			const { username, password } = req.body;

			const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (!usernameRegex.test(username)) {
				throw boom.badRequest('Некорректный формат логина');
			}

			const passwordRegex = /^[a-zA-Z._0-9]+$/;
			if (!passwordRegex.test(password)) {
				throw boom.badRequest(
					'Пароль должен содержать только буквы a-z, A-Z, цифры 0-9, точку (.) и символ подчеркивания (_)'
				);
			}

			const user = await User.findOne({ username });
			if (!user) {
				throw boom.notFound(`Пользователь с логином ${username} не найден`);
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				throw boom.unauthorized('Неверный пароль');
			}

			const token = generateAccesToken(user._id, user.name);
			logger.info('Пользователь успешно авторизовался', {
				token,
				name: user.name,
				roles: user.roles,
				id: user._id,
			});
			res.json({
				token,
				name: user.name,
				roles: user.roles,
				id: user._id,
				email: user.username,
			});
		} catch (error) {
			logger.error('Ошибка авторизации пользователя', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getAll(req, res, next) {
		try {
			const cacheKey = 'all_users';
			const cachedUsers = cache.get(cacheKey);
			if (cachedUsers) {
				logger.info('Пользователи получены из кэша', { cacheKey });
				return res.json(cachedUsers);
			}

			const users = await User.find();
			cache.set(cacheKey, users);
			logger.info('Успешное получение списка пользователей', { users });
			res.json(users);
		} catch (error) {
			logger.error('Ошибка получения списка пользователей', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async get(req, res, next) {
		try {
			const user = await User.findById(req.params.id);
			if (!user) {
				throw boom.notFound('Пользователь не найден');
			}
			logger.info('Успешное получение пользователя', { user });
			res.json(user);
		} catch (error) {
			logger.error('Ошибка получения пользователя', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { password, ...rest } = req.body;

			if (password) {
				const passwordRegex = /^[a-zA-Z._0-9]+$/;
				if (!passwordRegex.test(password)) {
					throw boom.badRequest(
						'Пароль должен содержать только буквы a-z, A-Z, цифры 0-9, точку (.) и символ подчеркивания (_)'
					);
				}
				rest.password = await bcrypt.hash(password, 7);
			}

			const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });
			if (!updatedUser) {
				throw boom.notFound('Пользователь не найден');
			}
			cache.del('all_users'); // Инвалидация кэша при обновлении
			logger.info('Успешное обновление пользователя', { updatedUser });
			res.json({
				message: 'Данные пользователя успешно обновлены',
				user: updatedUser,
			});
		} catch (error) {
			logger.error('Ошибка обновления пользователя', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			const deletedUser = await User.findByIdAndDelete(id);
			if (!deletedUser) {
				throw boom.notFound('Пользователь не найден');
			}
			cache.del('all_users'); // Инвалидация кэша при удалении
			logger.info('Успешное удаление пользователя', { deletedUser });
			res.json({ message: 'Пользователь удален!' });
		} catch (error) {
			logger.error('Ошибка удаления пользователя', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async addNewRole(req, res, next) {
		try {
			const { rolesName } = req.body;
			const role = await Roles.findOne({ value: rolesName });
			if (role) {
				throw boom.conflict(`Роль ${rolesName} уже существует`);
			}
			const newRole = new Roles({ value: rolesName });
			await newRole.save();
			logger.info('Успешное добавление новой роли', { newRole });
			res.json({ message: 'Роль успешно создана' });
		} catch (error) {
			logger.error('Ошибка добавления новой роли', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},
};
