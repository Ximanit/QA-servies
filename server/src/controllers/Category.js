const Category = require('../models/Profile');
const boom = require('@hapi/boom'); // Импорт boom

module.exports = {
	async createCategory(req, res, next) {
		try {
			const { name, description } = req.body;

			const category = new Category({ name, description });
			await category.save();
			res.status(201).json(category);
		} catch (error) {
			next(error); // Передаем ошибку в middleware обработки ошибок
		}
	},

	async getcategory(req, res, next) {
		try {
			const category = await Category.find();
			res.status(200).json(category);
		} catch (error) {
			next(error);
		}
	},

	async getCategoryById(req, res, next) {
		try {
			const category = await Category.findById(req.params.id);
			if (!category) {
				throw boom.notFound('Категория не найдена');
			}
			res.status(200).json(category);
		} catch (error) {
			next(error);
		}
	},

	async updateCategory(req, res, next) {
		try {
			const { name, description } = req.body;

			const category = await Category.findByIdAndUpdate(req.params.id, {
				name,
				description,
			});
			if (!category) {
				throw boom.notFound('Категория не найдена');
			}
			res.status(200).json(profile);
		} catch (error) {
			next(error);
		}
	},

	async deleteProfile(req, res, next) {
		try {
			const category = await Category.findByIdAndDelete(req.params.id);
			if (!category) {
				throw boom.notFound('Категория не найдена');
			}
			res.status(200).json({ message: 'Категория успешно удалена' });
		} catch (error) {
			next(error);
		}
	},
};
