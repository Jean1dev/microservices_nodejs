const express = require(`express`)
const port = 3005
const app = express()
const cors = require('cors')
const server = require('http').Server(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())
app.use(require(`./routes`))

server.listen(port, () => {
    console.log(`module-comunicacao: ${port}`)
})