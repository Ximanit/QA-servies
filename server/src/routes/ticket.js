const Router = require('express');
const router = new Router();
const controller = require('../controllers/Ticket');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.route('/stats').get(controller.getTicketStats);

router.route('/').post(controller.createTicket).get(controller.getTickets);

router
	.route('/:id')
	.get(controller.getTicketById)
	.put(controller.updateTicket)
	.delete(controller.deleteTicket);

router.route('/user/:userId').get(controller.getTicketsByUserId);

module.exports = router;
