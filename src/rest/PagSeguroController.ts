import { Response, NextFunction } from 'express';
import { GeneralController } from './GeneralController';
import database from '../models'
import * as request from 'request'
import { insertIDPagSeguro } from '../utils/gerenciadorSQl';
import { pagSeguroToken, pagSeguroEmail } from '../utils/pagSeguroInfo';

export class PagSeguroController extends GeneralController {

    init(): void {
        this.router.get('/transaction_id:id_pagseguro', this.saveInfoPagSeguro)
        this.router.get('/sessionId', this.returnSessionID)
        this.router.post('/payment', this.doPayment)
    }

    doPayment(req: any, res: Response, next: NextFunction) {
        // OLHAR ISSO E VE SE REFATORA https://nodejs.org/api/querystring.html
        let url = 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions'
        let uri = `${url}/email=${pagSeguroEmail}
                    &token=${pagSeguroToken}
                    &paymentMode=default
                    &paymentMethod=creditCard
                    &receiverEmail=${pagSeguroEmail}
                    &currency=BRL
                    &extraAmount=0.00
                    &itemId1=0001
                    &itemDescription1=Faxina Simples
                    &itemAmount1=${req.body.Payment.cost}
                    &itemQuantity1=1
                    &reference=REF1234
                    &senderName=${req.body.userInfo.name}
                    &senderCPF=${req.body.userInfo.cpf}
                    &senderAreaCode=11
                    &senderPhone=56273440
                    &senderEmail=${req.body.userInfo.email}
                    &senderHash=${req.body.userInfo.hash}
                    &shippingAddressStreet=Av. Brig. Faria Lima
                    &shippingAddressNumber=1384
                    &shippingAddressComplement=5o andar
                    &shippingAddressDistrict=Jardim Paulistano
                    &shippingAddressPostalCode=01452002
                    &shippingAddressCity=Sao Paulo
                    &shippingAddressState=SP
                    &shippingAddressCountry=BRA
                    &shippingType=3
                    &shippingCost=1.00
                    &creditCardToken=${req.body.token}
                    &installmentQuantity=1
                    &installmentValue=${req.body.Payment.cost}
                    &noInterestInstallmentQuantity=0
                    &creditCardHolderName=${req.body.creditCard.cardHolder}
                    &creditCardHolderCPF=${req.body.cpf}
                    &creditCardHolderBirthDate=27/10/1987 
                    &creditCardHolderAreaCode=11
                    &creditCardHolderPhone=56273440
                    &billingAddressStreet=Av. Brig. Faria Lima
                    &billingAddressNumber=1384
                    &billingAddressComplement=5o andar
                    &billingAddressDistrict=Jardim Paulistano
                    &billingAddressPostalCode=01452002
                    &billingAddressCity=Sao Paulo
                    &billingAddressState=SP
                    &billingAddressCountry=BRA
        `


        let options = {
            headers: {
                'Content-Type': 'application/xml',
                'charset': 'utf-8'
            }
        }
        request.post(uri.replace( /\s/g, ''), options, (err, response, body) => {
            if (err) throw new Error(err)
            
            res.send(body)
        })
    }

    returnSessionID(req: any, res: Response, next: NextFunction) {
        let email = pagSeguroEmail
        let token = pagSeguroToken
        let url_sess = 'https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?'
        let url = `${url_sess}email=${email}&token=${token}`

        request.post(url, (err, response, body) => {
            if (err) throw new Error(err)
            res.send(body)
        })
    }

    saveInfoPagSeguro(req: any, res: Response, next: NextFunction) {
        let info = req.params.id_pagseguro
        database.sequelize.query(insertIDPagSeguro(info)).then(resp => {
            res.send('ok')
        }).catch(err => {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                status: false,
                message: String(err)
            }))
        })
    }

}


const pagSeguroController = new PagSeguroController
pagSeguroController.init()

export default pagSeguroController.router