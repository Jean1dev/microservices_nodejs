const mongoose = require('mongoose')

const Mail = new mongoose.Schema({
    title: {
        type: String,
    },

    to: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    detalhes_tecnicos: {
        type: Object
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Mail', Mail)

