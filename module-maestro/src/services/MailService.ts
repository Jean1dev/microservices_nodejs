import * as nodemailer from "nodemailer";

//https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799
class Mail {

    private host: any = 'smtp-mail.outlook.com'
    private port: any = 587
    private SSL: any = false
    private user: any = 'jeanluca_fp@hotmail.com'//'neura.app.desenv@gmail.com'
    private password: any = 'Zombie123'//'obscure345'

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }


    async sendMail() {
        
        let mailOptions = {
            from: "jeanlucafp@gmail.com",
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        // correcao de erro # https://stackoverflow.com/questions/49761707/mailing-with-node-js-issue-with-the-host-property
        const transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.SSL,
            auth: {
                user: this.user,
                pass: this.password
            },
           // tls: { ciphers: 'SSLv3' }
        });

        //console.log(mailOptions);

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(`erro ao enviar email`, error)
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        });
    }


}

export default new Mail;