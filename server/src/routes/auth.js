const Router = require('express');
const router = new Router();
const controller = require('../controllers/Auth');
const { check } = require('express-validator');

router.route('/register').post(
	[
		check('username', 'Username cannot be empty').notEmpty(),
		check('password', 'Password must be more than 4 characters').isLength({
			min: 4,
		}),
	],
	controller.registr
);

router.route('/login').post(controller.login);
router.route('/users').get(controller.getAll);
router.route('/user').post(controller.get);
router.route('/delete').delete(controller.delete);
router.route('/update/:id').put(controller.update);
router.route('/addRole').post(controller.addNewRole);

module.exports = router;
