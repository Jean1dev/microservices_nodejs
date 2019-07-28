const express = require('express')
const httpProxy = require('express-http-proxy')
const router = express.Router()
const healthAlive = require('api-jaguar-commons/lib/healthAlive').checarServicos
const base_url = `http://localhost`
const urls = require('api-jaguar-commons/lib/getUrl')
const JAGUAR_APIS_ROUTES = urls.getUrls(process.env.TIPO_AMBIENTE || 'localhost')

const root = httpProxy(base_url)
//const empresa = httpProxy(`${base_url}:3000/rest/empresa`)
//const user = httpProxy(`${base_url}:3000/rest/user`)
const graphql = httpProxy(`${JAGUAR_APIS_ROUTES.maestro}/graphql`)
const site = httpProxy(`http://localhost:3001/app`)
const notify = httpProxy(JAGUAR_APIS_ROUTES.notify)
const integracao = httpProxy(JAGUAR_APIS_ROUTES.integracao)
//const whatsapp = httpProxy(`${base_url}:3004`)
const comunicacao = httpProxy(JAGUAR_APIS_ROUTES.comunicacao)
// drive 3006
const chat = httpProxy(JAGUAR_APIS_ROUTES.chat)

const ssl_url = '/.well-known/acme-challenge/*'
router.use(express.static(__dirname, { dotfiles: 'allow' }));

router.get(ssl_url,
    (req, res) => {
        res.send('YKaIVJ8VqMZQCSK9Jp_ahH1DHtLEpgRWtpYFK5pPysA.5oPFSBTUeOyg1wMu2My7Km47ZF4HiLJEZbDVRW-o19s')
    })
//**************************************************************
router.get('/status', (req, res, next) => healthAlive(req, res, next))
//**************************************************************

//*********************************** API CHAT */
router.post(`/chat/*`, (req, res, next) => chat(req, res, next))

//*********************************** API COMUNICACAO */
router.post(`/comunicacao/*`, (req, res, next) => comunicacao(req, res, next))
router.get('/comunicacao/*', (req, res, next) => comunicacao(req, res, next))

//*********************************** API INTEGRACAO */
router.post(`/integracao/*`, (req, res, next) => integracao(req, res, next))
router.get(`/integracao/*`, (req, res, next) => integracao(req, res, next))

//************************************ API NOTIFY* */
router.post(`/notify/*`, (req, res, next) => notify(req, res, next))

//*************************************API MAESTRO  ******* */
router.get('/graphql', (req, res, next) => graphql(req, res, next))

router.post('/graphql', (req, res, next) => graphql(req, res, next))

router.delete('/graphql', (req, res, next) => graphql(req, res, next))

//*********************************  ROOT      ************* */
router.get('/on', (req, res, next) => root(req, res, next))

//*********************************  SITE     ******************* */
router.get('/app', (req, res, next) => site(req, res, next))

module.exports = router