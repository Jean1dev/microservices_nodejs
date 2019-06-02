const environment = require('../../.env')
//            PAGSEGURO
export const pagSeguroEmail = process.env.emailPagSeguro || environment.pagSeguroEmail
export const pagSeguroToken = process.env.apiPagSeguro || environment.apiPagSeguro
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//                      NEXMO
export const nexmoAPI = process.env.nexmoAPI || environment.nexmoAPI
export const nexmoToken = process.env.nexmoToken || environment.nexmoToken
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//                      APIWHATS
export const authAPiWha = process.env.authAPiWha || environment.authAPiWha
//-------------------------------------------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
//                TWILIO
export const twilioAccountSid = process.env.twilioAccountSid || environment.twilioAccountSid
export const twilioToken = process.env.twilioToken || environment.twilioToken
