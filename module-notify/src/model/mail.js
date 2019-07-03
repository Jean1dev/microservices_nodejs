const mongoose = require('mongoose')

const Mail = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Mail', Mail)

