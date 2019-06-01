const express = require('express')
const httpProxy = require('express-http-proxy')
const router = express.Router()
const base_url = `http://localhost:3000`

const root = httpProxy(base_url)
const empresa = httpProxy(`${base_url}/rest/empresa`)
const user = httpProxy(`${base_url}/rest/user`)
const graphql = httpProxy(`${base_url}/graphql`)

//*************************************************************** */
router.get('/graphql', (req, res, next) => {
    graphql(req, res, next)
})

router.post('/graphql', (req, res, next) => {
    graphql(req, res, next)
})

router.delete('/graphql', (req, res, next) => {
    graphql(req, res, next)
})
//*************************************************************** */

router.get('/on', (req, res, next) => {
    root(req, res, next)
})

module.exports = router