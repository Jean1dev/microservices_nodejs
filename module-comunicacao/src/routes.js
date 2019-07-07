const routes = require('express').Router()
const _apiWha = require('./services/apiWha')

routes.post(`/send`, _apiWha.sendWhats)

module.exports = routes