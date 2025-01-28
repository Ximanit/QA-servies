const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const { secret } = require('../../config');

module.exports = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return next(boom.unauthorized('Авторизация не пройдена'));
	}

	try {
		const decoded = jwt.verify(token, secret);
		req.user = decoded;
		next();
	} catch (error) {
		console.error('Ошибка верификации токена:', error); // Выводим подробную информацию об ошибке
		return next(boom.unauthorized(`Ошибка авторизации: ${error.message}`)); // Более информативное сообщение
	}
};
