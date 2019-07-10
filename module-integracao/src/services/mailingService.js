const csv = require('csvtojson')
const axios = require(`axios`)
const Mailing = require('../models/mailing')
const defaultObjectMongoose = require('../models/default')
const basePath = `${__dirname}/../../tmp`

/** O FORMATO DO CSV DEVE SER   CONTATO; TELEFONE; MENSAGEM; ........ */
class MailingService {

    async getInfoFromCsv(file) {
        return await csv({ delimiter: `;` }).fromFile(`${basePath}/${file}`)
    }

    async integrarApiWhatsContatosExistentes(mailingList) {
        return null
    }

    async integrarApiWhatsContatosInexistentes(mailingList) {
        mailingList.forEach(async element => {
            this.atualizarStatusMailing(element.id)
            let contatoInfo = await this.getInfoFromCsv(element.path) 
            contatoInfo.forEach(async contato => {
                let result = await axios.post('http://localhost:3005/send', { 
                    number: contato.TELEFONE,
                    message: contato.MENSAGEM
                })
                this.saveDefaultObject(object)
            })
        })
    }

    atualizarStatusMailing(mailingId) {
        Mailing.findById(mailingId).then(resultado => {
            resultado.status = `PROCESSADO`
            resultado.save().then(res => {
                console.log("sucesso")
            }).catch(err => {
                console.log("err")
            })
        })
    }

    saveDefaultObject(object) {
        defaultObjectMongoose.create(object)
    }
}

module.exports = new MailingService()