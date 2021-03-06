const routes = require('express').Router()
const healthAlive = require('api-jaguar-commons/lib/healthAlive').healthAlive
const _ctrl = require(`./controllers/mail`)

routes.post(`/notify/send-mail`, _ctrl.enviar)

routes.get('/on', healthAlive)

module.exports = routes