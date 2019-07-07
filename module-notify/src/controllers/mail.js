const mail = require(`../model/mail`)
const service = require('../service/mailSender')

module.exports.enviar = (req, res) => {
    console.log(req.body)
    const content = {
        to: req.body.to,
        content: req.body.content
    }
    service.sendMail(content, args => {
        content.detalhes_tecnicos = args
        mail.create(content, (err, response) => {
            if (err) {
                res.send(err)
            } else {
                res.json({ status: `OK`, response })
            }
        })

    })
}