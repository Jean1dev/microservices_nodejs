const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const _mailing = require('./controllers/mailingController')

routes.post('/integracao', multer(multerConfig).single('file'), _mailing.store)

module.exports = routes