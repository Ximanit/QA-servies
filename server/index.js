const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const http = require('http');
const cors = require('cors');
// const path = require('path');
const { routes } = require('./src/routes');

const errorMiddleware = require('./src/middleware/errorMiddleware');

const db_uri = 'mongodb://localhost:27017/QA';
const hostname = 'localhost';
const port = 3000;

mongoose
	.connect(db_uri)
	.then(() => console.log('Connected to the database!'))
	.catch((err) => console.log(err));

const app = express();

const corsOptions = {
	origin: '*',
	methods: 'HEAD,PUT,PATCH,POST,DELETE',
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};

app.use(errorMiddleware);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Название роута сотовляется из названия файла + роут
//Пример:
//http:/localhost:PORT/назвение_route/запрос
routes.forEach((item) => {
	app.use(`/${item}`, require(`./src/routes/${item}`));
});

app.listen(port, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
