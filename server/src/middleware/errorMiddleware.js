module.exports = (err, req, res, next) => {
	console.error(err); // Логирование ошибки для отладки

	const { output } = err; // Получаем информацию об ошибке от boom

	res.status(output.statusCode).json({
		error: output.payload.message,
		details: output.payload.details || null, // Добавляем детали ошибки, если есть
	});
};
