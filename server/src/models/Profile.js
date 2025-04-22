const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
	fio: {
		type: String,
		required: true,
	},
	questions: {
		type: Number,
		default: 0,
	},
	answers: {
		type: Number,
		default: 0,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'usersauth',
		required: true,
	},
});

module.exports = model('Profile', ProfileSchema);
