const express = require('express')
const httpProxy = require('express-http-proxy')
const path = require('path')
const router = express.Router()
const healthAlive = require('api-jaguar-commons/lib/healthAlive').checarServicos
const base_url = `http://localhost`


const root = httpProxy(base_url)
//const empresa = httpProxy(`${base_url}:3000/rest/empresa`)
//const user = httpProxy(`${base_url}:3000/rest/user`)
const graphql = httpProxy(`${base_url}:3000/graphql`)
const site = httpProxy(`http://localhost:3001/app`)
const notify = httpProxy(`${base_url}:3002`)
const integracao = httpProxy(`${base_url}:3003`)
//const whatsapp = httpProxy(`${base_url}:3004`)
const comunicacao = httpProxy(`${base_url}:3005`)
// drive 3006

const ssl_url = '/.well-known/acme-challenge/cS9vh9913ewfeS-bQY_lpC1EjNQesx_hXm763lAmNBU'
router.use(express.static(__dirname, { dotfiles: 'allow' }));
const ssl = '/.well-known/acme-challenge/cS9vh9913ewfeS-bQY_lpC1EjNQesx_hXm763lAmNBU'
router.get(ssl_url,
    (req, res) => {
        res.download('cS9vh9913ewfeS-bQY_lpC1EjNQesx_hXm763lAmNBU.5oPFSBTUeOyg1wMu2My7Km47ZF4HiLJEZbDVRW-o19s')
    })
//**************************************************************
router.get('/status', (req, res, next) => healthAlive(req, res, next))
//**************************************************************

//*********************************** API COMUNICACAO */
router.post(`/api-wha-token-update`, (req, res, next) => comunicacao(req, res, next))
router.get('/token', (req, res, next) => comunicacao(req, res, next))
router.get('/credit', (req, res, next) => comunicacao(req, res, next))

//*********************************** API INTEGRACAO */
router.post(`/integracao`, (req, res, next) => integracao(req, res, next))
router.post(`/iniciar-fila-existentes`, (req, res, next) => integracao(req, res, next))
router.post(`/iniciar-fila-desconhecidos`, (req, res, next) => integracao(req, res, next))
router.get(`/info-integracao`, (req, res, next) => integracao(req, res, next))

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