const routes = require('express').Router()
const healthAlive = require('api-jaguar-commons/lib/healthAlive').healthAlive
const _mensagemController = require('./controllers/mensagensController')

routes.post('/chat/send-message', _mensagemController.mensagemRecebida)
routes.get('/on', healthAlive)

module.exports = routes