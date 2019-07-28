const func = require('../lib/getUrl')
let should = require('should')

describe('deve retornar o objeto de url correto', () => {

    it('deve retornar o objeto para localhost', () => {
        const retorno = func.getUrls('localhost')
        retorno.should.have.property('chat', 'http://localhost:3007/chat');
    })

    it(`deve retornar o objeto para docker`, () => {
        const retorno = func.getUrls('docker')
        retorno.should.have.property('chat', 'http://chat:3007/chat');
    })
})