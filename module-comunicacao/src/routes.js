const routes = require('express').Router()
const _apiWha = require('./services/apiWha')
const _token = require('./services/gerenciadorTokens')
const healthAlive = require('api-jaguar-commons/lib/healthAlive').healthAlive

routes.post(`/comunicacao/send`, _apiWha.sendWhats)
routes.get(`/comunicacao/credit`, _apiWha.getCredits)
routes.get('/comunicacao/pull-messages', _apiWha.pullMessages)

routes.post(`/comunicacao/api-wha-token-update`, _token.alterarTokenApiWha)
routes.get('/comunicacao/token', _token.getToken)

routes.get('/on', healthAlive)

module.exports = routes