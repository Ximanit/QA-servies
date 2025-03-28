const Notification = require('../models/Notification');
const logger = require('../logger');
const boom = require('@hapi/boom');

module.exports = {
	async getUserNotifications(req, res, next) {
		try {
			const userId = req.user.id;
			const notifications = await Notification.find({
				recipient: userId,
				read: false,
			})
				.populate('ticket', 'title')
				.populate('message', 'content');
			logger.info('Уведомления успешно получены', {
				userId,
				count: notifications.length,
			});
			res.status(200).json(notifications);
		} catch (error) {
			logger.error('Ошибка получения уведомлений', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async markNotificationsAsRead(req, res, next) {
		try {
			const { ticketId } = req.params;
			const userId = req.user.id;
			await Notification.updateMany(
				{ ticket: ticketId, recipient: userId, read: false },
				{ read: true }
			);
			logger.info('Уведомления отмечены как прочитанные', { ticketId, userId });
			res.status(200).json({ message: 'Уведомления отмечены как прочитанные' });
		} catch (error) {
			logger.error('Ошибка при отметке уведомлений', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},
};
