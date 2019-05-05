import { JWT_SECRET } from './../../../src/utils/utils';
import * as jwt from 'jsonwebtoken';

import { app, db, chai, handleError, expect } from '../../test-utils';

describe('Campanha', () => {

    let token: string
    let id: number

    beforeEach(() => {
        return db.User.bulkCreate([
            {
                name: 'Peter Quill',
                email: 'peter@guardians.com',
                password: '1234'
            }
        ]).then(users => {
            id = users[0].get('id')
            const payload = { sub: id }
            token = jwt.sign(payload, JWT_SECRET)
        })
    })

    //-------------DEVE CADASTRAR UMA CAMPANHA
    describe('cadastrar campanha', () => {
        it('deve cadastrar uma campnha', () => {
            let body = {
                query: `
                mutation createCampanha($input: CampanhaCreateInput!){
                    createCampanha(input: $input) {
                    id
                    mensagem
                  }  
                }
                `,
                variables: {
                    input: {
                        ativo: true,
                        total_contatos: 4,
                        total_descarte: 3,
                        mailing: "12234243degwjoeihgoerhgo",
                        mensagem: "teste"
                    }
                }
            }

            return chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(JSON.stringify(body))
                .then(res => {
                    console.log(res.body.data)
                    const reg = res.body.data.createCampanha
                    expect(reg).to.be.an('object')
                    expect(reg.mensagem).to.equal('teste')
                }).catch(handleError)
        })
    })

    describe('Queries', () => {
        describe('deve retornar todas as campnhas do usuario', () => {

            let body = {
                query: `
                    query{
                        campanhas{
                            id
                            mensagem
                        }
                    }
                `
            }
            return chai.request(app)
                .post('/graphql')
                .set('content-type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(JSON.stringify(body))
                .then(res => {
                
                    const reg = res.body.data
                    console.log(reg)
                    //expect(reg).to.be.an('object')
                    //expect(reg.mensagem).to.equal('teste')
            }).catch(handleError)
        })
    })
})