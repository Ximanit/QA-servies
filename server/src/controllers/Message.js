// server/src/controllers/Message.js
const Message = require('../models/Message');
const Ticket = require('../models/Ticket');
const boom = require('@hapi/boom');
const logger = require('../logger');
const multer = require('multer');
const path = require('path');

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
	async createMessage(req, res, next) {
		upload(req, res, async (err) => {
			try {
				if (err) throw boom.badRequest('Ошибка загрузки файлов');

				const { ticketId, content } = req.body;
				if (!ticketId || !content) {
					throw boom.badRequest('Необходимо указать ticketId и content');
				}

				const author = req.user.id;
				const ticket = await Ticket.findById(ticketId);
				if (!ticket) throw boom.notFound('Заявка не найдена');

				const files =
					req.files?.map((file) => ({
						filename: file.filename,
						path: file.path,
						mimetype: file.mimetype,
						size: file.size,
					})) || [];

				const message = new Message({
					ticket: ticketId,
					content,
					author,
					files,
				});
				const savedMessage = await message.save();

				const populatedMessage = await Message.findById(
					savedMessage._id
				).populate('author', 'username');

				const io = req.app.get('io');
				io.to(ticketId).emit('newMessage', populatedMessage);

				// Определяем получателя
				const recipientId =
					author === ticket.author.toString()
						? ticket.assignedTo.toString()
						: ticket.author.toString();
				logger.info('Sending newMessageNotification', {
					ticketId,
					recipientId,
					messageId: savedMessage._id,
				});

				// Отправляем уведомление
				io.to(ticketId).emit('newMessageNotification', {
					ticketId,
					recipientId,
					messageId: savedMessage._id,
				});

				logger.info('Сообщение успешно создано', { message: populatedMessage });
				res.status(201).json(populatedMessage);
			} catch (error) {
				logger.error('Ошибка создания сообщения', {
					error: error.message,
					stack: error.stack,
				});
				next(error);
			}
		});
	},

	async getMessages(req, res, next) {
		try {
			const { ticketId } = req.params;
			const messages = await Message.find({ ticket: ticketId }).populate(
				'author',
				'username'
			);
			logger.info('Сообщения успешно получены', { messages });
			res.status(200).json(messages);
		} catch (error) {
			logger.error('Ошибка получения сообщений', {
				error: error.message,
				stack: error.stack,
			});
			next(error);
		}
	},
};
