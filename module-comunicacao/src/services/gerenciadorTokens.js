const fs = require('fs')
const path = `${__dirname}/../../.env`
const utils = require('./utils')

module.exports.alterarTokenApiWha = (req, res) => {
    if (!req.body.token) return res.send(`parametro token nao informado`)
    return res.send(criarEnvFile(req.body.token))
}

module.exports.getToken = (req, res) => {
    res.json(utils.requireUncached('../../.env').authAPiWha)
}

function criarEnvFile(token) {
    let modelo = `// RENOMEAR PARA .env e colocar os valores
                module.exports = {
                     authAPiWha: '${token}',
                    }`
    
    try {
        fs.unlinkSync(path)
        fs.writeFileSync(path, modelo)
        return { status: `OK` }
    } catch (error) {
        return error
    }

}