const express = require('express');

const sessionController = require('./controllers/sessionController');
const usuarioController = require('./controllers/usuarioController');
const categoriaController = require('./controllers/categoriaController');
const despesasController = require('./controllers/despesasController');
const receitasController = require('./controllers/receitasController');

const routes = express.Router();


routes.post('/session', sessionController.create);

routes.post('/users', usuarioController.create);
routes.get('/users', usuarioController.list);
routes.put('/users', usuarioController.update);
routes.delete('/users', usuarioController.delete);

routes.post('/categoria', categoriaController.create);
routes.get('/categoria', categoriaController.list);
routes.put('/categoria/:id', categoriaController.update);
routes.delete('/categoria/:id', categoriaController.delete);

routes.post('/despesas', despesasController.create);
routes.get('/despesasList', despesasController.list);
routes.get('/despesasList2', despesasController.listCategoria);
routes.delete('/despesas/:id', despesasController.delete);
routes.get('/depesasSoma', despesasController.soma)
routes.get('/despesasSoma2', despesasController.somaCategoria)

routes.post('/receitas', receitasController.create);
routes.get('/receitas', receitasController.list);
routes.delete('/receitas/:id', receitasController.delete);

module.exports = routes;  