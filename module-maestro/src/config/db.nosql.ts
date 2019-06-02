const uri = process.env.NODE_ENV == 'development'
    ? 'mongodb://127.0.0.1:27017/jaguardb'
    : "mongodb+srv://default:default@jaguardb-e7nlh.mongodb.net/test?retryWrites=true"

const init = () => {
    const mongo = require('mongoose')

    mongo.connect(uri, {
        useNewUrlParser: true
    })
}

module.exports = init