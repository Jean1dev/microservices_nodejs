import * as jwt from 'jsonwebtoken';

import { app, db, chai, handleError, expect } from '../../test-utils';
import { UserInstance } from '../../../src/models/UserModel';
import { JWT_SECRET } from '../../../src/utils/utils';

describe('User', () => {

    let token: string;
    let userId: number;

    beforeEach(() => {
        return db.User.bulkCreate([
            {
                name: 'Peter Quill',
                email: 'peter@guardians.com',
                password: '1234'
            },
            {
                name: 'Gamora',
                email: 'gamora@guardians.com',
                password: '1234'
            },
            {
                name: 'Groot',
                email: 'groot@guardians.com',
                password: '1234'
            }
        ]).then((users: UserInstance[]) => {
            userId = users[0].get('id');
            const payload = { sub: userId };
            token = jwt.sign(payload, JWT_SECRET);
        });
    });

    //---------------------------- INICIO DAS QUERIES-------------------------------
    describe('Queries', () => {

        describe('application/json', () => {

            describe('users', () => {

                it('should return a list of Users', () => {

                    let body = {
                        query: `
                            query {
                                users {
                                    name
                                    email
                                }
                            }
                        `
                    }
                    return chai.request(app)
                        .post('/graphql')
                        .set('content-type', 'application/json')
                        .send(JSON.stringify(body))
                        .then(res => {
                            const usersList = res.body.data.users;
                            expect(res.body.data).to.be.an('object');
                            expect(usersList).to.be.an('array');
                            expect(usersList[0]).to.not.have.keys(['id', 'photo', 'createdAt', 'updatedAt'])
                            expect(usersList[0]).to.have.keys(['name', 'email']);
                        }).catch(handleError);
                })
                //--------------- FIM 'should return a list of Users'

                it('should paginate a list of Users', () => {
                    
                    let body = {
                        query: `
                            query getUsersList($first: Int, $offset: Int) {
                                users(first: $first, offset: $offset) {
                                    name
                                    email
                                    createdAt
                                }
                            }
                        `,
                        variables: {
                            first: 2,
                            offset: 1
                        }
                    }

                    return chai.request(app)
                        .post('/graphql')
                        .set('content-type', 'application/json')
                        .send(JSON.stringify(body))
                        .then(res => {
                            const usersList = res.body.data.users;
                            expect(res.body.data).to.be.an('object');
                            expect(usersList).to.be.an('array').of.length(2);
                            expect(usersList[0]).to.not.have.keys(['id', 'photo', 'updatedAt'])
                            expect(usersList[0]).to.have.keys(['name', 'email', 'createdAt']);
                        }).catch(handleError)
                })
                //----------------------- FIM  'should paginate a list of Users'

                describe('Users', () => {

                    it('should return a single User', () => {
                        let body = {
                            query: `
                                query getSingleUser($id: ID!) {
                                    user(id: $id) {
                                        id
                                        name
                                        email
                                    }
                                }
                            `,
                            variables: {
                                id: 1
                            }
                        };

                        return chai.request(app)
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body))
                            .then(res => {
                                const singleUser = res.body.data.user;
                                expect(res.body.data).to.be.an('object');
                                expect(singleUser).to.be.an('object');
                                expect(singleUser).to.have.keys(['id', 'name', 'email']);
                                expect(singleUser.name).to.equal('Peter Quill');
                                expect(singleUser.email).to.equal('peter@guardians.com');
                            }).catch(handleError);
                    })

                })
                //----------------------------FIM describre USERS

            })
        })

    })
    //---------------------------- FIM DAS QUERIES-------------------------------

});