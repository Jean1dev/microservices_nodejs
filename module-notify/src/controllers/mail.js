const mail = require(`../model/mail`)
const service = require('../service/mailSender')

module.exports.enviar = (req, res) => {
    const content = {
        to: req.body.to,
        content: req.body.content
    }
    service.sendMail(content, args => {
        mail.create(content, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.send(`ok`)
            }
        })

    })
}