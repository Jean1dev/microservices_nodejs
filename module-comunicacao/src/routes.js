const routes = require('express').Router()
const _apiWha = require('./services/apiWha')
const _token = require('./services/gerenciadorTokens')
const healthAlive = require('api-jaguar-commons/lib/healthAlive').healthAlive

routes.post(`/send`, _apiWha.sendWhats)
routes.post(`/api-wha-token-update`, _token.alterarTokenApiWha)
routes.get('/on', healthAlive)

module.exports = routes