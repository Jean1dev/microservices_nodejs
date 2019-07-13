//index.js
const fs = require('fs');
const http = require('http');
const https = require('https')
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const port = process.env.PORT || 8080
const production = process.env.PROD || false

app.use(cors())
app.use(require('./routes'))
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (production) {
    // Certificate
    //https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca
    /**
     * IMPORTANT NOTES:
    - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/rocketenvios.tk/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/rocketenvios.tk/privkey.pem
   Your cert will expire on 2019-10-11. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
    - If you like Certbot, please consider supporting our work by:

     Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
     Donating to EFF:                    https://eff.org/donate-le
     */
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/rocketenvios.tk/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/rocketenvios.tk/fullchain.pem', 'utf8');
    //const ca = fs.readFileSync('/etc/letsencrypt/live/rocketenvios.tk/chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate
        //ca: ca
    };

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(8080, () => {
        console.log('HTTPS Server running on port 8080');
    });

} else {
    var server = http.createServer(app);
    server.listen(port);
    console.log(`module-gateway`, port)
}