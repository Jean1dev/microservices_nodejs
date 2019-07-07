const express = require(`express`)
const morgan = require(`morgan`)
const db = require('./config/db')
const path = require('path')
const cors = require('cors')
const port = 7070
const app = express()
const server = require('http').Server(app)

require('api-jaguar-commons/lib/fileSystem').createDirTmp()

db()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))
app.use(require(`./routes`))

server.listen(port, () => {
    console.log(`module-drive: ${port}`)
})