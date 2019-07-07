const express = require('express')
const bodyParser = require('body-parser')
import WhatsAppJs from './WhatsAppJs'

const WAJS = new WhatsAppJs({
    headless: false,
    devTools: false
})

const app = express()
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

app.use(function(req, res, next){

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

const port = 3004
const run = () => {
	
}
WAJS.initiate().then(async () => {
	await WAJS.getQrCode({})
	app.listen(port)
	console.log('module-whatsapp : ' + port);
})

app.post('/send', function(req, res){
	try {
		WAJS.sendMessage({ target: req.body.contato, message: 'é drone rogerinho' })	
	} catch (error) {
		console.log('enfia no cu')
	}
	res.send('ok')
});