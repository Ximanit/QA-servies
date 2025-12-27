const Router = require('express');
const router = new Router();
const controller = require('../controllers/Profile');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.route('/').post(controller.createProfile).get(controller.getProfile);

router
	.route('/:id')
	.get(controller.getProfileById)
	.put(controller.updateProfile)
	.delete(controller.deleteProfile);

module.exports = router;
