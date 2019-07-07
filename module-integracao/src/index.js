const express = require(`express`)
const morgan = require(`morgan`)
const db = require('./config/db')
const cors = require('cors')
const port = 3003
const app = express()
const server = require('http').Server(app)
require('api-jaguar-commons/lib/fileSystem').createDirTmp()

db()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))
app.use(require(`./routes`))

server.listen(port, () => {
    console.log(`module-integracao: ${port}`)
})