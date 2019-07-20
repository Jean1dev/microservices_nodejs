const mongoose = require('mongoose')

const ChatInfo = new mongoose.Schema({
    id: {
        type: String,
    },
    
    number: {
        type: String,
    },
    
    from: {
        type: String,
    },

    type: {
        type: String,
    },

    text: {
        type: String,
    },

    creation_date: {
        type: String,
    },

    process_date: {
        type: String,
    },

    failed_date: {
        type: String,
    },

    custom_data: {
        any: Schema.Types.Mixed
    },

    mensagensRecebidas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MensagemRecebida'}],

    mensagensEnviadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MensagemEnviada'}],
}, {
    timestamps: true
})

module.exports = mongoose.model('ChatInfo', ChatInfo)

