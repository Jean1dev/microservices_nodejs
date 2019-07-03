const url = process.env.URL_MONGO || 'mongodb://127.0.0.1:27017/jaguardb'
const init = () => {
    const mongo = require('mongoose')

    mongo.connect(url, {
        useNewUrlParser: true
    })
}

module.exports = init