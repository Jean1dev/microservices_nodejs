const routes = require('express').Router()
const healthAlive = require('api-jaguar-commons/lib/healthAlive').healthAlive

routes.get('/on', healthAlive)

module.exports = routes