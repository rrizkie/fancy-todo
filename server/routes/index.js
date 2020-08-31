const routes = require('express').Router()
const Controller = require('../controller/TodoController')
const UserController = require('../controller/UserController')

routes.get('/todos',Controller.show)
routes.post('/todos',Controller.add)
routes.get('/todos/:id',Controller.find)
routes.put('/todos/:id',Controller.edit)
routes.delete('/todos/:id',Controller.delete)
routes.post('/register',UserController.register)
routes.post('/login',UserController.login)


module.exports = routes