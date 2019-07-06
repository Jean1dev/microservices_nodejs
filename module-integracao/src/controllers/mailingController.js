const Mailing = require(`../models/mailing`)

class MailingController {

    store(req, res) {
        Mailing.create({
            title: req.file.originalname,
            path: req.file.key
        })
        return res.json({ status: 'OK'})
    }

}

module.exports = new MailingController()