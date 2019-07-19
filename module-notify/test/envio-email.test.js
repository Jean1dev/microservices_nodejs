// https://imasters.com.br/front-end/enviando-e-mail-usando-node-js
const nodemailer = require('nodemailer')
const config = require(`../.env`)

describe(' test rotina de envio email', () => {
  it('enviando email via nodemailer', () => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.email,
        pass: config.senha
      },
      tls: { rejectUnauthorized: false }
    })

    const mailOptions = {
      from: config.email,
      to: 'jeanluca_fp@hotmail.com',
      subject: 'E-mail enviado usando Node!',
      text: 'Bem fácil, não? ;)'
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);

      }
    })
  })
})