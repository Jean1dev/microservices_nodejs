const axios = require('axios')

const api = url => axios.create({ baseUrl: url })

module.exports = api