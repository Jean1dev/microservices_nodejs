const axios = require('axios')
const urls = require('api-jaguar-commons/lib/getUrl')
const JAGUAR_APIS_ROUTES = urls.getUrls(process.env.TIPO_AMBIENTE || 'localhost')

module.exports.enviarMensagemWhatsapp = (dadosMensagem) => {
    let content = {
        number: dadosMensagem.paraQuem,
        message: dadosMensagem.message
    }
    axios.post(`${JAGUAR_APIS_ROUTES.comunicacao}/send`, content)
}
