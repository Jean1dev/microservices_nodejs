const axios = require('axios')
const JAGUAR_APIS_ROUTES = require('api-jaguar-commons/config/routes.json')

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