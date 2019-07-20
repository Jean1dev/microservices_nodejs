const mensagemRecebidaSchema = require('../models/mensagemRecebida')
const mensagemEnviadaSchema = require('../models/mensagemEnviada')
const api = require('../services/apiService')
const events = require('../events/gerenciadorEventos')

class MensagemController {

    async mensagemRecebida(req, res) {
        console.log(req.body)
        res.json( {status: `OK`} )
        let retorno = await mensagemRecebidaSchema.create(req.body)
        events.emit('internal-message-receive', retorno)
    }

}

events.on('client-send-message', (data) => {
    mensagemEnviadaSchema.create(data)
    api.enviarMensagemWhatsapp(data)
})

module.exports = new MensagemController()