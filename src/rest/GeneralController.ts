import { JWT_SECRET } from './../utils/utils';
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

}