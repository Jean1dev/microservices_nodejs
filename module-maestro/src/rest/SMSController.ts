import { GeneralController } from './GeneralController';
import { Response } from 'express';
import { NextFunction } from "connect";
import { nexmoAPI, nexmoToken } from '../utils/Constantes';
const Nexmo = require('nexmo')

export class SMSController extends GeneralController{

    public init(): void {
        this.router.post('/test', this.sendSMS)
    }

    public sendSMS(req: any, res: Response, next: NextFunction) {
        const nexmo = new Nexmo({
            apiKey: nexmoAPI,
            apiSecret: nexmoToken
          })
        const from = 'Nexmo'
        const to = req.body.number
        const text = 'teste envio sms by rocket envios'

        nexmo.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                res.send(err);
            } else {
                if(responseData.messages[0]['status'] === "0") {
                    res.send("Message sent successfully.");
                } else {
                    res.send(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        })
    }

}

const sms = new SMSController()
sms.init()
export default sms.router