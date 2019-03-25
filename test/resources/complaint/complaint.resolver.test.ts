import * as jwt from 'jsonwebtoken'
import { chai, db, app, expect, handleError } from './../../test-utils';
import { UserInstance } from '../../../src/models/UserModel';
import { JWT_SECRET } from '../../../src/utils/utils';

describe('Complaint', () => {
    let token: string
    let iduser: number

   /* beforeEach(() => {
        return db.User.findById(1).then((user: UserInstance) => {
            iduser = 1
            const payload = {sub: iduser}
            token = jwt.sign(payload, JWT_SECRET)

            return db.Complaints.create({
                description: 'teste',
                cause: ' teste',
                author: iduser,
                accused: 5
            })
        })
    })*/

    describe('Queries', () => {

        describe('application/json', () => {

            describe('complaints', () => {

                it('should return a list of complaints', () => {

                    let body = {
                        query: `
                            query {
                                complaints{
                                    id
                                    description
                                }
                            }
                        `
                    }

                    return chai.request(app)
                        .post('/graphql')
                        .set('content-type', 'application/json')
                        .send(JSON.stringify(body))
                        .then(res => {
                            const list = res.body.data.complaints
                            
                        }).catch(handleError)

                })
            })
        })
    })

    describe('Mutations', () => {

        describe('application/json', () => {

            describe('createComplaint', () => {

                it('should create a new complaint', () => {

                    let body = {
                        query: `
                        mutation createNewComplaint($input: ComplaintInput!) {
                            createComplaint(input: $input) {
                                id
                                description
                            }
                        }
                        `,
                        variables: {
                            input: {
                                description: 'teste',
                                cause: 'teste',
                            }
                        }
                    }

                    return chai.request(app)
                        .post('/graphql')
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${token}`)
                        .send(JSON.stringify(body))
                        .then(res => {
                            const comp = res.body.data.createComplaint
                            expect(res.body.data).to.be.an('object')
                            expect(res.body.data).to.have.key('createComplaint')
                        }).catch(handleError)
                })
            })
        })
    })
})