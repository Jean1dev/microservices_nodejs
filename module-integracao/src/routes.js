const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('api-jaguar-commons/lib/multer.config')
const healthAlive = require('api-jaguar-commons/lib/healthAlive').healthAlive
const _mailing = require('./controllers/mailingController')

routes.post('/integracao/integracao', multer(multerConfig).single('file'), _mailing.store)
routes.post('/integracao/iniciar-fila-existentes', _mailing.integrarApiContatoExistente)
routes.post('/integracao/iniciar-fila-desconhecidos', _mailing.integrarApiContatoInexistente)
routes.get('/integracao/info-integracao', _mailing.getLast20Messages)

routes.get('/on', healthAlive)

module.exports = routes