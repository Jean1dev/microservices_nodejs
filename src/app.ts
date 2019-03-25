import  PagSeguroController  from './rest/PagSeguroController';
import  TempController  from './rest/TempController';
import  UserController  from './rest/UserController';
import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import * as cors from 'cors'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as bodyParser from "body-parser";
import * as path from 'path'
import schema from './graphql/schema';
import db from './models'
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware';
import { DataLoaderFactory } from './graphql/dataloaders/DataLoaderFactory';
import { RequestedFields } from './graphql/ast/RequestedFields';
import { apolloUploadExpress } from 'apollo-upload-server' // ACREDITO QUE NAO SERA MAIS NECESSARIO USAR O APOLLO
import * as multipart from 'connect-multiparty'
import  PostController  from './rest/PostController';
import ScheduleController from './rest/ScheduleController';

class App {

    public express: express.Application
    private dataLoaderFactory: DataLoaderFactory
    private requestedFields: RequestedFields

    constructor() {
        this.express = express()
        this.init()
    }

    private init(): void {
        this.requestedFields = new RequestedFields()
        this.dataLoaderFactory = new DataLoaderFactory(db, this.requestedFields)
        this.middleware()
        this.routes()
    }

    private middleware(): void {

        this.express.use(cors({
            origin: '*',
            methods: ['GET, POST'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Enconding'],
            preflightContinue: false,
            optionsSuccessStatus: 204
        }))

        this.express.use(compression())
        this.express.use(helmet())
        // ADICIONEI O BODY PARSER, REMOVER CASO HAJA ALGUM PROBLEMA NAS ROTAS /GRAPHQL 
        this.express.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
        this.express.use(bodyParser.json())
        //this.express.use(multipart()) // SE HABILITAR OCORRE ERRO COM O FORMIDABLE
        
        //this.express.set('views', __dirname + '/public/site/app.html')
        //this.express.engine('html', require('ejs').renderFile)
        //this.express.set('view engine', 'ejs')
    }

    private routes():void {

        let router = express.Router()
        // URI/ON    -> RETORNA SE A API ESTA ONLINE
        router.get('/on', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.json({ status: 'ON'})
        })

        this.express.use(express.static(__dirname + '/public'))
        this.express.use('/app', (req, res) => {
            res.sendFile('app.html', { root: path.join(__dirname, './public/app')})
        })
        this.express.use('/rest/user', UserController)
        this.express.use('/rest/post', PostController) //
        this.express.use('/rest/schedule', ScheduleController) //
        this.express.use('/rest/pagseguro', PagSeguroController)
        this.express.use('/', TempController) //
        this.express.use('/graphql', apolloUploadExpress({ maxFileSize: 1000000, maxFiles: 10}),

            extractJwtMiddleware(),

            (req, res, next) => {
                req['context']['db'] = db
                req['context']['dataloaders'] = this.dataLoaderFactory.getLoaders()
                req['context']['requestedFields'] = this.requestedFields
                next()
            },

            graphqlHTTP((req) => ({
                schema: schema,
                graphiql: process.env.NODE_ENV === 'development',
                context: req['context']
            })))

        this.express.use('/', router)
    }
}

export default new App().express