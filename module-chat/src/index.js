const express = require(`express`)
const db = require('./config/db')
const port = 3007
const app = express()
const server = require('http').Server(app)

db()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(require(`./routes`))

server.listen(port, () => {
    console.log(`module-chat: ${port}`)
})