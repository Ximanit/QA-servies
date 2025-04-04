const Ticket = require('../models/Ticket');
const boom = require('@hapi/boom');
const logger = require('../logger');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
	destination: './uploads/',
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 10000000 },
	fileFilter: (req, file, cb) => {
		const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
		if (!allowedTypes.includes(file.mimetype)) {
			return cb(new Error('Недопустимый тип файла'));
		}
		cb(null, true);
	},
}).array('files', 5);

module.exports = {
	async createTicket(req, res, next) {
		upload(req, res, async (err) => {
			try {
				if (err) throw boom.badRequest('Ошибка загрузки файлов');

				const { title, description, category, priority, assignedTo } = req.body;
				if (!title || !description) {
					throw boom.badRequest('Заголовок и описание обязательны');
				}

				const author = req.user.id;
				const files =
					req.files?.map((file) => ({
						filename: file.filename,
						path: file.path,
						mimetype: file.mimetype,
						size: file.size,
					})) || [];

				const ticket = new Ticket({
					title,
					description,
					category,
					author,
					files,
					priority,
					assignedTo,
				});
				await ticket.save();

				logger.info('Заявка успешно создана', { ticket });
				res.status(201).json(ticket);
			} catch (error) {
				logger.error('Ошибка создания заявки', {
					error: error.message,
					stack: error.stack,
				});
				next(error);
			}
		});
	},

	async getTickets(req, res, next) {
		try {
			const tickets = await Ticket.find()
				.populate('author', 'username')
				.populate('assignedTo', 'username');
			logger.info('Заявки успешно получены', { tickets });
			res.status(200).json(tickets);
		} catch (error) {
			logger.error('Ошибка получения заявок', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getTicketById(req, res, next) {
		try {
			const ticket = await Ticket.findById(req.params.id)
				.populate('author', 'username')
				.populate('assignedTo', 'username');
			if (!ticket) throw boom.notFound('Заявка не найдена');
			logger.info('Заявка по id  успешно получены', { ticket });
			res.status(200).json(ticket);
		} catch (error) {
			logger.error('Ошибка получения заявки по id', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getTicketsByUserId(req, res, next) {
		try {
			const { userId } = req.params;
			const tickets = await Ticket.find({
				$or: [{ author: userId }, { assignedTo: userId }],
			})
				.populate('author', 'username')
				.populate('assignedTo', 'username');

			logger.info('Заявки пользователя успешно получены', {
				userId,
				ticketCount: tickets.length,
			});
			res.status(200).json(tickets);
		} catch (error) {
			logger.error('Ошибка получения заявок пользователя', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async updateTicket(req, res, next) {
		upload(req, res, async (err) => {
			try {
				if (err) throw boom.badRequest('Ошибка загрузки файлов');

				const { title, description, category, status, assignedTo } = req.body;
				const files =
					req.files?.map((file) => ({
						filename: file.filename,
						path: file.path,
						mimetype: file.mimetype,
						size: file.size,
					})) || [];

				const ticket = await Ticket.findById(req.params.id);
				if (!ticket) throw boom.notFound('Заявка не найдена');

				const updatedData = {
					...(title && { title }),
					...(description && { description }),
					...(category && { category }),
					...(status && { status }),
					...(assignedTo && { assignedTo }),
					updatedAt: Date.now(),
				};

				if (files.length > 0) {
					updatedData.files = [...ticket.files, ...files];
				}

				const updatedTicket = await Ticket.findByIdAndUpdate(
					req.params.id,
					updatedData,
					{ new: true }
				);

				logger.info('Заявка успешно обновлена', { updatedTicket });
				res.status(200).json(updatedTicket);
			} catch (error) {
				logger.error('Ошибка обновления заявки', {
					error: error.message,
					stack: error.stack,
				});
				next(error);
			}
		});
	},

	async deleteTicket(req, res, next) {
		try {
			const ticket = await Ticket.findByIdAndDelete(req.params.id);
			if (!ticket) throw boom.notFound('Заявка не найдена');
			logger.info('Заявка успешно удалена', { ticket });
			res.status(200).json({ message: 'Заявка успешно удалена' });
		} catch (error) {
			logger.error('Ошибка удаления заявки', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},

	async getTicketStats(req, res, next) {
		try {
			const { period, startDate, endDate } = req.query;
			const userId = req.user.id;

			let dateFilter = {};
			const now = new Date();

			switch (period) {
				case 'day':
					dateFilter = {
						createdAt: {
							$gte: new Date(now.setHours(0, 0, 0, 0)),
							$lte: new Date(now.setHours(23, 59, 59, 999)),
						},
					};
					break;
				case 'week':
					const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
					dateFilter = {
						createdAt: {
							$gte: new Date(weekStart.setHours(0, 0, 0, 0)),
							$lte: new Date(now.setHours(23, 59, 59, 999)),
						},
					};
					break;
				case 'month':
					dateFilter = {
						createdAt: {
							$gte: new Date(now.getFullYear(), now.getMonth(), 1),
							$lte: new Date(
								now.getFullYear(),
								now.getMonth() + 1,
								0,
								23,
								59,
								59,
								999
							),
						},
					};
					break;
				case 'year':
					dateFilter = {
						createdAt: {
							$gte: new Date(now.getFullYear(), 0, 1),
							$lte: new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999),
						},
					};
					break;
				case 'custom':
					if (!startDate || !endDate) {
						throw boom.badRequest(
							'Для пользовательского периода нужны startDate и endDate'
						);
					}
					dateFilter = {
						createdAt: {
							$gte: new Date(startDate),
							$lte: new Date(endDate),
						},
					};
					break;
				default:
					throw boom.badRequest('Неверный период');
			}

			// Агрегация данных по дням
			const createdTicketsAgg = await Ticket.aggregate([
				{
					$match: {
						author: new mongoose.Types.ObjectId(userId),
						...dateFilter,
					},
				},
				{
					$group: {
						_id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
						count: { $sum: 1 },
					},
				},
				{ $sort: { _id: 1 } },
			]);

			const completedTicketsAgg = await Ticket.aggregate([
				{
					$match: {
						assignedTo: new mongoose.Types.ObjectId(userId),
						status: 'Закрыта',
						...dateFilter,
					},
				},
				{
					$group: {
						_id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
						count: { $sum: 1 },
					},
				},
				{ $sort: { _id: 1 } },
			]);

			const stats = {
				createdTickets: createdTicketsAgg.map((item) => ({
					date: item._id,
					count: item.count,
				})),
				completedTickets: completedTicketsAgg.map((item) => ({
					date: item._id,
					count: item.count,
				})),
				period,
				...(period === 'custom' && { startDate, endDate }),
			};

			logger.info('Статистика заявок успешно получена', { stats, userId });
			res.status(200).json(stats);
		} catch (error) {
			logger.error('Ошибка получения статистики заявок', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},
};
