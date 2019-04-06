import { JWT_SECRET } from './../utils/utils';
import * as jwt from 'jsonwebtoken'
import {Router, Request, Response, NextFunction} from 'express';
import db from './../models'
/**
 * 
 * https://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/
 */
export abstract class GeneralController {

    router: Router
    db: any

    constructor() 
    {
        this.router = Router()
    }

    public abstract init(): void 

    public async isAuthorized(token): Promise<boolean> {
        let authorization = token ? token.split(' ')[1] : undefined
        if (!authorization) return false
        token = await jwt.sign(authorization, JWT_SECRET)
        return true
    }
}