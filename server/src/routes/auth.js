const Router = require('express');
const router = new Router();
const controller = require('../controllers/Auth');
const { check } = require('express-validator');

router.route('/registr').post(controller.registr);

router.route('/login').post(controller.login);
router.route('/users').get(controller.getAll);
router.route('/user/:id').get(controller.get);
router.route('/delete').delete(controller.delete);
router.route('/update/:id').put(controller.update);
router.route('/addRole').post(controller.addNewRole);
router.route('/change-password/:id').put(controller.changePassword);

module.exports = router;
