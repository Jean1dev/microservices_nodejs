const mongoose = require('mongoose')

const Mailing = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
})


module.exports = mongoose.model('Mailing', Mailing)

