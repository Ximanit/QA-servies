// models/Question.js
const { Schema, model } = require('mongoose');

const QuestionSchema = new Schema({
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
		ref: 'usersauth', // Ссылка на модель User
		required: true,
	},
	category: {
		type: String,
		default: 'General',
	},
	status: {
		type: String,
		enum: ['Новый', 'В работе', 'Закртый'],
		default: 'Новый',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	answers: {
		type: Schema.Types.ObjectId,
		ref: 'Answer',
	}, // Добавьте это поле
});

module.exports = model('Question', QuestionSchema);
