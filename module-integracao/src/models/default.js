const mongoose = require('mongoose')

const Default = new mongoose.Schema({
    
    content: {
        type: Object
    }
    
}, {
    timestamps: true
})


module.exports = mongoose.model('Default', Default)

