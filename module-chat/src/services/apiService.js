const axios = require('axios')
const JAGUAR_APIS_ROUTES = require('api-jaguar-commons/config/routes.json')

module.exports.enviarMensagemWhatsapp = (dadosMensagem) => {
    let content = {
        number: dadosMensagem.paraQuem,
        message: dadosMensagem.message
    }
    axios.post(`${JAGUAR_APIS_ROUTES.comunicacao}/send`, content)
}
