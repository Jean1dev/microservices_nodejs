import { DbConnection } from './../interface/DbConnectionInterface';
import {Router, Request, Response, NextFunction} from 'express';
/**
 * 
 * https://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/
 */
export class GeneralController {

    router: Router
    db: any

    constructor() 
    {
        this.router = Router()
    }
}