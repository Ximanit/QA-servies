// models/Answer.js
const { Schema, model } = require('mongoose');

const AnswerSchema = new Schema({
	question: {
		type: Schema.Types.ObjectId,
		ref: 'Question', // Ссылка на модель Question
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'usersauth', // Ссылка на модель User
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = model('Answer', AnswerSchema);
