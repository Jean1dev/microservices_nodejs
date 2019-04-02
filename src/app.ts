import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import * as cors from 'cors'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as bodyParser from "body-parser";
import schema from './graphql/schema';
import db from './models'
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware';
import { DataLoaderFactory } from './graphql/dataloaders/DataLoaderFactory';
import { RequestedFields } from './graphql/ast/RequestedFields';
import { apolloUploadExpress } from 'apollo-upload-server' // ACREDITO QUE NAO SERA MAIS NECESSARIO USAR O APOLLO
//import * as multipart from 'connect-multiparty'
const mongo = require('./config/db.nosql')

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
        this.startMongo()
    }

    private startMongo(): void {
        mongo()
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
                graphiql: true, // qnd tiver realmente em producao usar a linha de baixo
                //graphiql: process.env.NODE_ENV === 'development',
                context: req['context']
            })))

        //this.express.use('/', router)
        this.express.use(require('./routes'))
    }
}

export default new App().express