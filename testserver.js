const express = require('express')
const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')
const mongo = require('mongoose')

const app = express()
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(multiparty()); 

mongo.connect("mongodb+srv://default:default@jaguardb-e7nlh.mongodb.net/test?retryWrites=true", {
	useNewUrlParser: true
})

app.use(function(req, res, next){

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

const port = 8090
app.listen(port)

console.log('Servidor HTTP esta escutando na porta ' + port);

app.get('/', function(req, res){
	res.send({msg:'funfo'});
});