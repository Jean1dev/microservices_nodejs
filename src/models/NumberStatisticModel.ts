const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    author: String,
    number: String,
    sent: {
        type: Number,
        default: 0
    },
    failed: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('NumberStatistic', schema)
