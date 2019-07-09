const routes = require('express').Router()
const _apiWha = require('./services/apiWha')
const _token = require('./services/gerenciadorTokens')

routes.post(`/send`, _apiWha.sendWhats)
routes.post(`/api-wha-token-update`, _token.alterarTokenApiWha)

module.exports = routes