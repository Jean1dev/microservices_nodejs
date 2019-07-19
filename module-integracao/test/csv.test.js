/*
https://www.npmjs.com/package/csvtojson
*/
//let csvFilePath = `${__dirname}/../`
const csv = require('csvtojson')
//const teste = require(`api-jaguar-commons/lib/fileSystem`)
let app = require('../src/index')
let should = require('should')
let request = require('supertest')(app)

describe('module-integracao', () => {

    it('deve ler um csv', () => {
        let csvStream = `NOME;TELEFONE;MENSAGEM;CPFCNPJ;CONTRATO;CARTEIRA
        ARIEL DIAS FELTRIN;48991775710;Bom dia;38248867072;20028726826001;SANTANDER IRREGULAR`

        csv({ delimiter: `;` }).fromString(csvStream).then(json => {
            json[0].should.have.property('NOME', 'ARIEL DIAS FELTRIN')
        })
    })

    it('deve retornar as informacoes das ultimas integracoes', () => {
        request.get('/integracao/info-integracao')
            .end((err, res) => {
                res.status.should.eql(200)
            })
    })
})

return
// Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);