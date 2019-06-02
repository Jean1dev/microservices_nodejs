import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../../utils/utils';
import { UserInstance } from '../../../models/UserModel';
import { DbConnection } from '../../../interface/DbConnectionInterface';

export const tokenResolvers = {

    Mutation: {

      // Analisar para alterar o nome dessa Mutation para Login, acho que fica mais claro
        login: (parent, { email, password }, {db}: {db: DbConnection}) => {
            return db.User.findOne({
                where: {email: email},
                attributes: ['id', 'password']
            }).then((user: UserInstance) => {

                let errorMessage: string = 'Unauthorized, wrong email or password!'
                
                if (!user || !user.isPassword(user.get('password'), password)) { throw new Error(errorMessage) }
                if (!user) { throw new Error(errorMessage) }

                const payload = {sub: user.get('id')}

                return {
                    token: jwt.sign(payload, JWT_SECRET)
                }

            })
        }

    }

}
