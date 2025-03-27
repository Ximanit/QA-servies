// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
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
		origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
		methods: ['GET', 'POST'],
	},
});

app.set('io', io); // Привязываем io к объекту app

const corsOptions = {
	origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
	methods: 'HEAD,PUT,PATCH,POST,DELETE,GET',
	allowedHeaders:
		'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

o.on('connection', (socket) => {
	logger.info('New client connected', { socketId: socket.id });

	socket.on('joinTicket', (ticketId) => {
		socket.join(ticketId);
		logger.info('Client joined ticket room', { socketId: socket.id, ticketId });
	});

	socket.on('resetNotifications', ({ ticketId, userId }) => {
		// Здесь можно добавить логику для сброса уведомлений на сервере, если нужно
		io.to(ticketId).emit('notificationsReset', { ticketId, userId });
	});

	socket.on('disconnect', () => {
		logger.info('Client disconnected', { socketId: socket.id });
	});
});

server.listen(port, () => {
	logger.info(`Server running at http://localhost:${port}/`);
});
