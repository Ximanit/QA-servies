const User = require('../models/Users');
const Roles = require('../models/Roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
// const { secret } = require('../../config');
const boom = require('boom');

// const generateAccesToken = (id, username) => {
// 	const payload = {
// 		id,
// 		username,
// 	};
// 	return jwt.sign(payload, secret, {
// 		expiresIn: '24h',
// 	});
// };

module.exports = {
	async registr(req, res) {
		try {
			// const errors = validationResult(req);
			// if (!errors.isEmpty()) {
			// 	return res.status(400).json({
			// 		message: 'Ошибка при регистрации',
			// 		errors,
			// 	});
			// }
			const name = req.body.name ?? 'User';
			const { username, password } = req.body;

			// Проверка username с использованием регулярного выражения
			const usernameRegex =
				/^([\w]+\.?)+(?<!\.)@(?!\.)[a-zа-я0-9ё\.-]+\.?[a-zа-яё]{2,}$/iu;
			if (!usernameRegex.test(username)) {
				return res.status(400).json({
					message: 'Некорректный формат логина',
				});
			}

			if (password.length < 5) {
				return res.status(400).json({
					message: 'Длинна пароля должна быть минимум 5 символов',
				});
			}

			//TODO переписать регулярку, чтобы проверяла на длинну и повтор символов
			// Проверка пароля с использованием регулярного выражения
			const passwordRegex = /^[a-zA-Z._0-9]+$/;
			if (!passwordRegex.test(password)) {
				return res.status(400).json({
					message:
						'Пароль должен содержать только буквы a-z, A-Z, цифры 0-9, точку (.) и символ подчеркивания (_)',
				});
			}

			const candidate = await User.findOne({
				username,
			});
			if (candidate) {
				return res.status(400).json({
					message: `Пользователь с логином ${username} уже существует`,
				});
			}

			const userRole = await Roles.findOne({
				value: 'USER',
			});

			const hashPassword = bcrypt.hashSync(password, 7);
			const user = new User({
				username,
				name,
				password: password,
				roles: [userRole.value],
			});
			await user.save();

			return res.status(200).send(user);
		} catch (error) {
			return res.status(400).send({ status: false, err: boom.boomify(error) });
		}
	},

	async login(req, res) {
		try {
			const { username, password } = req.body;

			// Проверка username с использованием регулярного выражения
			const usernameRegex =
				/^([\w]+\.?)+(?<!\.)@(?!\.)[a-zа-я0-9ё\.-]+\.?[a-zа-яё]{2,}$/iu;
			if (!usernameRegex.test(username)) {
				return res.status(400).json({
					message: 'Некорректный формат логина',
				});
			}

			// Проверка пароля с использованием регулярного выражения
			const passwordRegex = /^[a-zA-Z._0-9]+$/;
			if (!passwordRegex.test(password)) {
				return res.status(400).json({
					message:
						'Пароль должен содержать только буквы a-z, A-Z, цифры 0-9, точку (.) и символ подчеркивания (_)',
				});
			}

			const user = await User.findOne({
				username,
			});

			if (!user) {
				return res.status(400).json({
					message: `Пользователь с логином ${username} не найден`,
				});
			}
			// const validPassword = bcrypt.compareSync(password, user.password);
			// if (!validPassword) {
			// 	return res.status(400).json({
			// 		message: `Пароль не правильный`,
			// 	});
			// }
			const name = user.name;
			const user_id = user._id;
			const roles = user.roles;
			// const token = generateAccesToken(user_id, name);
			return res.status(200).send({
				// token: token,
				name: name,
				roles: roles,
				id: user_id,
			});
		} catch (error) {
			return res.status(400).send({ status: false, err: boom.boomify(err) });
		}
	},
	async getAll(req, res) {
		try {
			const users = await User.find();
			res.json(users);
		} catch (error) {
			console.log(error);
			res.status(403).json({
				message: 'Пользователь не авторизован',
			});
		}
	},
	async get(req, res) {
		const { username } = req.body;
		const user = await User.findOne({
			username,
		});
		try {
			res.json(user);
		} catch (error) {
			console.log(error);
			res.status(400).json({
				message: 'Пользователь не найден',
			});
		}
	},
	async update({ params: { id }, body }, res) {
		try {
			if (body.password) {
				const passwordRegex = /^[a-zA-Z._0-9]+$/;
				// Проверка пароля с использованием регулярного выражения
				if (!passwordRegex.test(body.password)) {
					return res.status(400).json({
						message:
							'Пароль должен содержать только буквы a-z, A-Z, цифры 0-9, точку (.) и символ подчеркивания (_)',
					});
				}
				body.password = bcrypt.hashSync(body.password, 7);
			}
			await User.findByIdAndUpdate(id, body, {
				new: true,
			});
			res.status(200).json({
				message: 'Данные пользователя успешно обновлены',
			});
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},
	async delete(req, res) {
		const { id } = req.body;
		try {
			let deleted = await User.findByIdAndDelete(id);
			res.status(200).json({
				message: 'Пользователь удален!',
			});
		} catch (err) {
			res.status(404).json({
				message: 'Ошибка при удалении пользователя',
			});
		}
	},
	async addNewRole(req, res) {
		try {
			const { rolesName } = req.body;
			const role = await Roles.findOne({
				rolesName,
			});
			if (role) {
				return res.json({
					message: `Такая роль уже есть`,
				});
			}
			const roles = new Roles({
				value: rolesName,
			});
			await roles.save();
			res.status(200).json({
				message: 'Роль успешно создана',
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				message: 'Ошибка при добавлении новой роли',
			});
		}
	},
};
