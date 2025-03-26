const logger = require('../logger');

module.exports = (err, req, res, next) => {
	// Определяем, является ли ошибка экземпляром Boom
	const isBoom = err.isBoom;
	const statusCode = isBoom ? err.output.statusCode : 500;
	const message = isBoom
		? err.output.payload.message
		: 'Внутренняя ошибка сервера';
	const details = isBoom && err.data ? err.data : null;

	if (!isBoom) {
		logger.error('Unexpected error', { error: err.message, stack: err.stack });
		return res.status(500).json({
			status: 'error',
			message: 'Внутренняя ошибка сервера',
		});
	}

	// Подробное логирование ошибки
	logger.error('Request failed', {
		method: req.method,
		url: req.url,
		statusCode,
		message,
		stack: err.stack,
		user: req.user ? req.user.id : 'unauthenticated',
		body: req.body, // Логируем тело запроса (осторожно с чувствительными данными)
	});

	// Формируем ответ для клиента
	const response = {
		status: 'error',
		message,
		...(details && { details }), // Добавляем детали, если есть
		...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Стек только в разработке
	};

	res.status(statusCode).json(response);
};
