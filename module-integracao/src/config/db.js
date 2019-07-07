const url = require('api-jaguar-commons/lib/constantes').MONGO_URL
const init = () => {
    const mongo = require('mongoose')

    mongo.connect(url, {
        useNewUrlParser: true
    })
}

module.exports = init