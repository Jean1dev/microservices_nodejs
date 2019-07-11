const mongoose = require('mongoose')

const InfoResponseApiComunicacao = new mongoose.Schema({
    mensagem_enviada: {
        type: String
    },
    telefone_enviado: {
        type: String
    },
    detalhes: {
        type: Object
    }
    
}, {
    timestamps: true
})


module.exports = mongoose.model('InfoResponseApiComunicacao', InfoResponseApiComunicacao)

