const { createLogger, transports, format } = require('winston');

// Настройка формата логов
const logFormat = format.printf(({ timestamp, level, message, ...meta }) => {
	return `${timestamp} [${level.toUpperCase()}]: ${message} ${
		Object.keys(meta).length ? JSON.stringify(meta) : ''
	}`;
});

const logger = createLogger({
	level: 'info', // Уровень по умолчанию (можно изменить на 'debug' для разработки)
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Добавляем временную метку
		format.errors({ stack: true }), // Включаем стек вызовов для ошибок
		logFormat
	),
	transports: [
		// Логи в консоль (удобно для разработки)
		new transports.Console({
			format: format.combine(format.colorize(), logFormat), // Цветной вывод в консоли
		}),
		// Логи в файл (для продакшена)
		new transports.File({ filename: 'logs/error.log', level: 'error' }), // Только ошибки
		new transports.File({ filename: 'logs/combined.log' }), // Все логи
	],
});

module.exports = logger;
