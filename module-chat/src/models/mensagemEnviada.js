const mongoose = require('mongoose')

const MensagemEnviada = new mongoose.Schema({
    id: {
        type: String,
    },
    
    paraQuem: {
        type: String,
    },

    message: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('MensagemEnviada', MensagemEnviada)

