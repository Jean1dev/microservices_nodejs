import * as jwt from 'jsonwebtoken'
import { UserInstance } from '../models/UserModel';
import { JWT_SECRET } from '../utils/utils';
import { Request, Response, NextFunction, RequestHandler } from 'express'
import db from './../models'

export const extractJwtMiddleware = (): RequestHandler => {

    return (req: Request, res: Response, next: NextFunction): void => {

        let authorization: string = req.get('authorization')
        let token: string = authorization ? authorization.split(' ')[1] : undefined

        req['context'] = {}
        req['context']['authorization'] = authorization

        if (!token) { return next() }

        jwt.verify(token, JWT_SECRET, (err, decoded: any) => {

            if (err) { return next() }

            db.User.findById(decoded.sub, {
                attributes: ['id', 'email']
            }).then((user: UserInstance) => {

                if (user) {
                    req['context']['authUser'] = {
                        id: user.get('id'),
                        email: user.get('email')
                    }
                }

                return next()

            })

        })

    }

}

export const isAuthorized = async req => {
    let authorization: string = req.get('authorization')
    let token: string = authorization ? authorization.split(' ')[1] : undefined
    if (!authorization) return false
    let ret = await jwt.verify(token, JWT_SECRET, async (err, decoded: any) => {
        if(err) return false
        console.log(`decod`,decoded.sub)
        const res = await db.User.findById(decoded.sub, {
            attributes: ['id', 'email']
        })
        return (res != null)
    })
    return ret
}