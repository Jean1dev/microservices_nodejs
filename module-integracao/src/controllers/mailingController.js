const Mailing = require(`../models/mailing`)
const service = require(`../services/mailingService`)
const apiService = require(`../services/apiService`)
const infoResponseAPI = require('../models/infoResponseApiComunicacao')

class MailingController {

    store(req, res) {
        Mailing.create({
            title: req.file.originalname,
            path: req.file.key,
            status: `AGUARDANDO`
        })
        return res.json({ status: 'OK' })
    }

    async integrarApiContatoExistente(req, res) {
        res.send( { status: `OK`} )
        apiService.notificarInicioIntegracao()
        const filaIntegracao = await Mailing.find({ status: `AGUARDANDO`})
        service.integrarApiWhatsContatosExistentes(filaIntegracao)
    }

    async integrarApiContatoInexistente(req, res) {
        res.send( { status: `OK`} )
        apiService.notificarInicioIntegracao()
        const filaIntegracao = await Mailing.find({ status: `AGUARDANDO`})
        service.integrarApiWhatsContatosInexistentes(filaIntegracao)
    }

    async getLast20Messages(req, res) {
        return res.json(await infoResponseAPI.find()
        .sort('createdAt')
        .limit(20))
    }
}

module.exports = new MailingController()