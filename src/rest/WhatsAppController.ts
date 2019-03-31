import { GeneralController } from "./GeneralController";
import { Response } from "express";
import { NextFunction } from "connect";
import { store, getAll } from "../persistence/NumberPersistence";

const SchemaNumber = require("../models/NumberStatisticModel")
const mongo = require("../config/db.nosql")
const twilio = null//require('twilio')
const request = require("request")
const accountSid = 'AC31b0f31556cd04ac150e0c3601b05ad7'
const authToken = '81237618671884f1488b4ea53b0aeabe'
const authAPiWha = 'OZ50RZ1GBJ6L59LJQAPP'

// https://www.twilio.com/docs/libraries/node

export class WhatsAppController extends GeneralController {

    init(): void {
        this.router.post('/test', this.sendWhatsApiCha)
        this.router.post('/test2', this.test2)
    }

    public async test2(req: any, res: Response, next: NextFunction) {
        await      store({
            author: "",
            number: req.body.number,
            sent: 1
        })
        return res.json(await getAll())
    }

    public async sendWhatsApiCha(req: any, res: Response, next: NextFunction) {
        var options = {
            method: 'GET',
            url: 'https://panel.apiwha.com/send_message.php',
            qs:
            {
                apikey: authAPiWha,
                number: req.body.number,
                text: 'enviado via apiWha- by jean -nodejs'
            }
        };

        await request(options, async function (error, response, body) {
            if (error) throw new Error(error);
            const resp = JSON.parse(body)
            res.send(resp)
            if(resp.success){
                store({
                    author: "",
                    number: req.body.number,
                    sent: 1
                })
            }
        }.bind(this)) //ARRUMAR UM JEITO DE FAZER O BIND PARA O CALLBACK TER ACESSO AO THIS
    }

    public sendWhatsTwilio(req: any, res: Response, next: NextFunction) {
        let client = new twilio(accountSid, authToken)
        client.messages.create({
            body: 'Hello from NodeJs, twilio api',
            to: '+554899972322',  // Text this number
            from: '+14155238886' // From a valid Twilio number
        }).then((message) => {
            console.log(message)
            res.send(message.sid)
        }).catch(err => res.send(err))

    }

}

const whats = new WhatsAppController()
whats.init()

export default whats.router