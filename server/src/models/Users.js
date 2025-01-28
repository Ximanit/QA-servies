const { Schema, model } = require('mongoose');

const User = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
		default: 'User',
	},
	password: {
		type: String,
		required: true,
	},
	roles: [
		{
			type: String,
			ref: 'Role',
		},
	],
	registrDate: {
		type: Date,
		default: new Date(),
		required: true,
	},
});

module.exports = model('usersauth', User);
