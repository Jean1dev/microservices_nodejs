const fs = require('fs')

module.exports.alterarTokenApiWha = (req, res) => {
    if (!req.body.token) return res.send(`parametro token nao informado`)
    return res.send(criarEnvFile(req.body.token))
}

function criarEnvFile(token) {
    let path = `${__dirname}/../../.env`
    let modelo = `// RENOMEAR PARA .env e colocar os valores
                module.exports = {
                     authAPiWha: '${token}',
                    }`

    try {
        fs.writeFileSync(path, modelo)
        return { status: `OK` }
    } catch (error) {
        return error
    }

}