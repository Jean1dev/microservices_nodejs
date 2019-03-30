import { GeneralController } from "./GeneralController";
import { Response } from "express";
import { NextFunction } from "connect";

const SchemaNumber = require("../models/NumberStatisticModel")
const mongo = require("../config/db.nosql")
const twilio = null//require('twilio')
const request = require("request")
const accountSid = 'AC31b0f31556cd04ac150e0c3601b05ad7'
const authToken = '81237618671884f1488b4ea53b0aeabe'
const authAPiWha = 'T5O62OP629TI61BD3O8R'

// https://www.twilio.com/docs/libraries/node

export class WhatsAppController extends GeneralController {

    init(): void {
        this.router.post('/test', this.sendWhatsApiCha)
    }

    public sendWhatsApiCha(req: any, res: Response, next: NextFunction) {
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

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            const resp = body
            res.send(resp)
            if(resp.success){
                this.store({
                    author: "",
                    number: req.body.number,
                    sent: 1
                })
            }
        });
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

    private async store(content: any): Promise<void> {
        mongo()
        const ret = await SchemaNumber.create(content)
        console.log(ret)
    }
}

const whats = new WhatsAppController()
whats.init()

export default whats.router