const request = require('request')
const token = require('../../.env')

class ApiWha {

    getCredits(req, res) {
        var options = {
            method: 'GET',
            url: 'https://panel.apiwha.com/get_credit.php',
            qs:
            {
                apikey: token.authAPiWha,
            }
        }
        console.log(token.authAPiWha)
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            return res.send(response.body)
        })
    }

    sendWhats(req, res) {
        var options = {
            method: 'GET',
            url: 'https://panel.apiwha.com/send_message.php',
            qs:
            {
                apikey: token.authAPiWha,
                number: req.body.number,
                text: req.body.message
            }
        }
        
        request(options, (error, response, body) => {
            if (error) throw new Error(error)
            return res.send(response.body)
        })
    }
}

module.exports = new ApiWha()
