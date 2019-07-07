const express = require('express')
const httpProxy = require('express-http-proxy')
const router = express.Router()
const base_url = `http://localhost`


const root = httpProxy(base_url)
//const empresa = httpProxy(`${base_url}:3000/rest/empresa`)
//const user = httpProxy(`${base_url}:3000/rest/user`)
const graphql = httpProxy(`${base_url}:3000/graphql`)
const site = httpProxy(`http://localhost:3001/app`)
const notify = httpProxy(`${base_url}:3002`)
const integracao = httpProxy(`${base_url}:3003`)
//const whatsapp = httpProxy(`${base_url}:3004`)
//comunicacao 3005


//*********************************** API INTEGRACAO */
router.post(`/integracao`, (req, res, next) => integracao(req, res, next))
router.post(`/iniciar-fila-existentes`, (req, res, next) => integracao(req, res, next))
router.post(`/iniciar-fila-desconhecidos`, (req, res, next) => integracao(req, res, next))

//************************************ API NOTIFY* */
router.post(`/send-mail`, (req, res, next) => notify(req, res, next))

//*************************************API MAESTRO  ******* */
router.get('/graphql', (req, res, next) => graphql(req, res, next))

router.post('/graphql', (req, res, next) => graphql(req, res, next))

router.delete('/graphql', (req, res, next) => graphql(req, res, next))

//*********************************  ROOT      ************* */
router.get('/on', (req, res, next) => root(req, res, next))

//*********************************  SITE     ******************* */
router.get('/app', (req, res, next) => site(req, res, next))

module.exports = router