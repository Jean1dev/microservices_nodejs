const nodemailer = require('nodemailer')
const config = require(`../../.env`)

module.exports.sendMail = (content, callback) => {
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
        to: content.to,
        subject: 'Notificacao Rocket-Envios!',
        text: content.content
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            callback(error)
        } else {
            callback('Email enviado: ' + info.response)
        }
    })
}
