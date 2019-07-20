const EventEmitter = require('events');

class GerenciadorEventos extends EventEmitter {

    enviarEventoInterno(EventName, data) {
        this.emit(EventName, data)
    }
    
}

module.exports = new GerenciadorEventos()
