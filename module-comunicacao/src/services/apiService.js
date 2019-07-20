const axios = require('axios')
const JAGUAR_APIS_ROUTES = require('api-jaguar-commons/config/routes.json')

module.exports.enviarMensagemParaApiChat = (content) => {
    axios.post(`${JAGUAR_APIS_ROUTES.chat}/send-message`, content)
}
