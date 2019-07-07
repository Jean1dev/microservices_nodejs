const axios = require('axios')

module.exports.notificarInicioIntegracao = () => {
    let content = {
        to: 'jeanluca_fp@hotmail.com',
        content: `integracao iniciada as ${new Date()}`
    }
    axios.post('http://localhost:3002/send-mail', content)
}