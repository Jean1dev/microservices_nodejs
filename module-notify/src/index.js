const express = require(`express`)
const db = require('./config/db.js')
const cors = require('cors')
const port = 3002
const app = express()

const server = require('http').Server(app)

db()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(require(`./routes`))

server.listen(port, () => {
    console.log(`module-notify: ${port}`)
})

module.exports = app