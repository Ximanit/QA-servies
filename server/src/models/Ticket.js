const { Schema, model } = require('mongoose');

const TicketSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'usersauth',
		required: true,
	},
	priority: {
		type: String,
		enum: ['Низкий', 'Средний', 'Высокий'],
		default: 'Средний',
	},
	status: {
		type: String,
		enum: ['Открыта', 'В работе', 'Закрыта'],
		default: 'Открыта',
	},
	files: [
		{
			filename: String,
			path: String,
			mimetype: String,
			size: Number,
		},
	],
	assignedTo: {
		type: Schema.Types.ObjectId,
		ref: 'usersauth',
		require: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = model('Ticket', TicketSchema);
