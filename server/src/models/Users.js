const { Schema, model } = require('mongoose');

const User = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	fio: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	registrDate: {
		type: Date,
		default: new Date(),
		required: true,
	},
});

module.exports = model('usersauth', User);
