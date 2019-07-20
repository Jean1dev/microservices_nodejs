const express = require(`express`)
const db = require('./config/db')
const port = 3007
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const load = require('express-load')

db()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(require(`./routes`))
//load('sockets').into(io)
require('./sockets/chat')(io)

server.listen(port, () => {
    console.log(`module-chat: ${port}`)
})