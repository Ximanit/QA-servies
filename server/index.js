const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http');

const { routes } = require('./src/routes');
const logger = require('./src/logger');
const errorMiddleware = require('./src/middleware/errorMiddleware');

const db_uri = process.env.DB_URI;
const port = process.env.PORT || 3000;

mongoose
	.connect(db_uri)
	.then(() => logger.info('Connected to the database!'))
	.catch((err) =>
		logger.error('Database connection failed', { error: err.message })
	);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.set('io', io);

const corsOptions = {
	origin: '*',
	methods: 'HEAD,PUT,PATCH,POST,DELETE,GET',
	allowedHeaders:
		'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' })); // Ограничение размера тела запроса до 1 МБ
app.use(express.urlencoded({ extended: true, limit: '1mb' })); // То же для URL-encoded данных
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
	morgan('combined', {
		stream: { write: (message) => logger.info(message.trim()) },
	})
);

routes.forEach((item) => {
	app.use(`/${item}`, require(`./src/routes/${item}`));
});

app.use(errorMiddleware);

io.on('connection', (socket) => {
	logger.info('New client connected', { socketId: socket.id });

	socket.on('joinTicket', (ticketId) => {
		socket.join(ticketId);
		logger.info('Client joined ticket room', { socketId: socket.id, ticketId });
	});

	socket.on('resetNotifications', ({ ticketId, userId }) => {
		io.to(ticketId).emit('notificationsReset', { ticketId, userId });
	});

	socket.on('disconnect', () => {
		logger.info('Client disconnected', { socketId: socket.id });
	});
});

server.listen(port, () => {
	logger.info(`Server running at http://localhost:${port}/`);
});
