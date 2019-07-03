const express = require(`express`)
const db = require('./config/db.config.js')
const cors = require('cors')
const port = 7071
const app = express()

const server = require('http').Server(app)

db()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(require(`./routes`))

server.listen(port, () => {
    console.log(`rodando na porta ${port}`)
})