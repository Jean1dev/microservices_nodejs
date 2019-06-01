const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

const _box = require('./controllers/boxController')
const _files = require('./controllers/fileController')

routes.post('/boxes', _box.store)
routes.get('/boxes/:id', _box.show)

routes.post('/boxes/:id/files', multer(multerConfig).single('file'), _files.store)

module.exports = routes