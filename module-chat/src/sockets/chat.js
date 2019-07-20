const events = require('../events/gerenciadorEventos')

module.exports = (io) => {

    io.on('connection', (socket) => {

        socket.on('send-server', (data) => {
            console.log(data)
        })

        socket.on('client-send-message', (data) => {
            events.emit('client-send-message', data)
        })

    })

    events.on('internal-message-receive', (data) => {
        io.emit('message', data)
    })


}