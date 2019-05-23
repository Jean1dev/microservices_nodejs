import * as http from 'http'
import app from './app'
import db from './models'
import { normalizePort, onError, onListening } from './utils/utils';
import "reflect-metadata"; // this shim is required

const server = http.createServer(app)
//const server = createExpressServer({
//    controllers: [UserController]
//})
const port = normalizePort(process.env.port || 3000)
let force = false
if(process.env.NODE_ENV == 'development') force = true 

// ATENCAO com force: true, ele dropa as tabelas e refaz elas !!! SEMPRE !!!!
db.sequelize.sync({ force: force }).then(() => {
    server.listen(port)
    server.on('error', onError(server))
    server.on('listening', onListening(server))
})

//  "sequelize": "4.13.10"