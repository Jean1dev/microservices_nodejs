let app = require('../src/index')
let should = require('should')
let request = require('supertest')(app)

describe('test api notify', () => {
    it('deve enviar um email', () => {
        let body = {
            to: 'jeanluca_fp@hotmail.com',
            content: 'unit test'
        }

        request.post('/notify/send-mail')
            .send(body)
            .end( function(err, res) {
                res.status.should.eql(200)
            })
    })
})