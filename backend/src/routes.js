const express = require('express');

const sessionController = require('./controllers/sessionController');
const profileController = require('./controllers/profileController');
const usuarioController = require('./controllers/usuarioController');
const categoriaController = require('./controllers/categoriaController');
const despesasController = require('./controllers/despesasController');
const receitasController = require('./controllers/receitasController');

const routes = express.Router();


routes.post('/session', sessionController.create);

routes.get('/profile', profileController.somaReceitas)
routes.get('/profile1', profileController.somaDespesas)
routes.get('/profile2', profileController.somaDespesasCategoria)

routes.post('/users', usuarioController.create);
routes.get('/users', usuarioController.list);
routes.put('/users', usuarioController.update);
routes.delete('/users', usuarioController.delete);

routes.post('/categoria', categoriaController.create);
routes.get('/categoria', categoriaController.list);
routes.put('/categoria/:id', categoriaController.update);
routes.delete('/categoria/:id', categoriaController.delete);

routes.post('/despesas', despesasController.create);
routes.get('/despesas/list', despesasController.list);
routes.get('/despesas/list2', despesasController.listCategoria);
routes.delete('/despesas/:id', despesasController.delete);

routes.post('/receitas', receitasController.create);
routes.get('/receitas', receitasController.list);
routes.delete('/receitas/:id', receitasController.delete);

module.exports = routes;  