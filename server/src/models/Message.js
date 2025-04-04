const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
	ticket: {
		type: Schema.Types.ObjectId,
		ref: 'Ticket',
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'usersauth',
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ['text', 'system', 'file'],
		default: 'text',
	},
	files: [
		{
			filename: String,
			path: String,
			mimetype: String,
			size: Number,
		},
	],
	readBy: [
		{
			user: { type: Schema.Types.ObjectId, ref: 'usersauth' },
			readAt: { type: Date, default: Date.now },
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = model('Message', MessageSchema);
