const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('api-jaguar-commons/lib/multer.config')
const healthAlive = require('api-jaguar-commons/lib/healthAlive').healthAlive
const _mailing = require('./controllers/mailingController')

routes.post('/integracao', multer(multerConfig).single('file'), _mailing.store)
routes.post('/iniciar-fila-existentes', _mailing.integrarApiContatoExistente)
routes.post('/iniciar-fila-desconhecidos', _mailing.integrarApiContatoInexistente)
routes.get('/on', healthAlive)

module.exports = routes