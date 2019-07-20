const mongoose = require('mongoose')

const MensagemRecebida = new mongoose.Schema({
    id: {
        type: String,
    },
    
    number: {
        type: String,
    },
    
    to: {
        type: String,
    },

    text: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('MensagemRecebida', MensagemRecebida)

