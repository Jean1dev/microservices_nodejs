const express = require('express')
const app = express()
const server = require('http').Server(app)
const path = require('path')
const port = 3001

console.log(path.join(__dirname, './public/app'))
app.use(express.static(`${__dirname}/public`))
app.get(`/app`, (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, './public/')})
})

server.listen(port, () => {
    console.log(`rodando na porta`, port)
})