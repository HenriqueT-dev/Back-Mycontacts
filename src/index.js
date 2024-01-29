const express = require('express');
require('express-async-errors');

const routes = require('./Routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');


const app = express();

app.use(express.json()); //body parser
app.use(cors); //requisição
app.use(routes); //rotas da API
app.use(errorHandler); //middleware de erro

app.listen(3001, () => console.log('Started'));
