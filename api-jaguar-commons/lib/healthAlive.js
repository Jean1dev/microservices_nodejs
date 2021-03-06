const axios = require('axios')
const urls = require('api-jaguar-commons/lib/getUrl')

module.exports.healthAlive = (req, res) => res.json({ status: 'UP' })

module.exports.checarServicos = async (req, res) => {
    let statusOff = { status: 'OFF' }
    let jsonRetorno = {}
    let baseUrl = urls.getUrls(process.env.TIPO_AMBIENTE || 'localhost')

    try {
        retorno = await axios.get(`${baseUrl}:3000/on`)
        jsonRetorno.maestro = retorno.data
    } catch (error) {
        jsonRetorno.maestro = statusOff
    }

    try {
        retorno = await axios.get(`${baseUrl}:3002/on`)
        jsonRetorno.notify = retorno.data
    } catch (error) {
        jsonRetorno.notify = statusOff
    }

    try {
        retorno = await axios.get(`${baseUrl}:3003/on`)
        jsonRetorno.integracao = retorno.data
    } catch (error) {
        jsonRetorno.integracao = statusOff
    }

    try {
        retorno = await axios.get(`${baseUrl}:3004/on`)
        jsonRetorno.whatsApi = retorno.data
    } catch (error) {
        jsonRetorno.whatsApi = statusOff
    }

    try {
        retorno = await axios.get(`${baseUrl}:3005/on`)
        jsonRetorno.comunicacao = retorno.data
    } catch (error) {
        jsonRetorno.comunicacao = statusOff
    }

    try {
        retorno = await axios.get(`${baseUrl}:3006/on`)
        jsonRetorno.drive = retorno.data
    } catch (error) {
        jsonRetorno.drive = statusOff
    }

    try {
        retorno = await axios.get(`${baseUrl}:3007/on`)
        jsonRetorno.chat = retorno.data
    } catch (error) {
        jsonRetorno.chat = statusOff
    }

    res.json(jsonRetorno)
}
