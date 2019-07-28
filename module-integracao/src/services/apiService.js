const axios = require('axios')
const urls = require('api-jaguar-commons/lib/getUrl')
const JAGUAR_APIS_ROUTES = urls.getUrls(process.env.TIPO_AMBIENTE || 'localhost')

module.exports.notificarInicioIntegracao = () => {
    let content = {
        to: 'jeanluca_fp@hotmail.com',
        content: `integracao iniciada as ${new Date()}`
    }
    axios.post(`${JAGUAR_APIS_ROUTES.notify}/send-mail`, content)

    content = {
        to: 'ariel.feltrin@goesnicoladelli.com.br',
        content: `integracao iniciada as ${new Date()}`
    }
    axios.post(`${JAGUAR_APIS_ROUTES.notify}/send-mail`, content)
}