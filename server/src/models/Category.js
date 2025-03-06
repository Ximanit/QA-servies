const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
	},
});

module.exports = model('Category', CategorySchema);
