const routes = require('express').Router()
const _ctrl = require(`./controllers/mail`)

routes.post(`/send-mail`, _ctrl.enviar)

module.exports = routes