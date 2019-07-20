const request = require('request')
const utils = require('./utils')
const api = require('./apiService')

class ApiWha {

    getCredits(req, res) {
        let token = utils.requireUncached('../../.env').authAPiWha
        var options = {
            method: 'GET',
            url: 'https://panel.apiwha.com/get_credit.php',
            qs:
            {
                apikey: token,
            }
        }
        
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            return res.send(response.body)
        })
    }

    sendWhats(req, res) {
        let token = utils.requireUncached('../../.env').authAPiWha
        var options = {
            method: 'GET',
            url: 'https://panel.apiwha.com/send_message.php',
            qs:
            {
                apikey: token,
                number: req.body.number,
                text: req.body.message
            }
        }
        
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            return res.send(response.body)
        })
    }

    pullMessages(req, res) {
        let token = utils.requireUncached('../../.env').authAPiWha
        var options = {
            method: 'GET',
            url: 'https://panel.apiwha.com/get_messages.php',
            qs:
            {
                apikey: token
            }
        }
        
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            return res.send(response.body)
        })
    }

    webHooks(req, res) {
        if (!req.body.data) return res.json({})
        res.json( {autoreply: "resposta automagica"} )
        api.enviarMensagemParaApiChat(req.body.data)
    }
}

module.exports = new ApiWha()
