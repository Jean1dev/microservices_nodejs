const axios = require('axios')
const urls = require('api-jaguar-commons/lib/getUrl')
const JAGUAR_APIS_ROUTES = urls.getUrls(process.env.TIPO_AMBIENTE || 'localhost')

module.exports.enviarMensagemParaApiChat = (content) => {
    axios.post(`${JAGUAR_APIS_ROUTES.chat}/send-message`, content)
}
