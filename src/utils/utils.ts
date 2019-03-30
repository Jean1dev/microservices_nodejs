import { Server } from "http";
import MailService from "../services/MailService";
import * as fs from 'fs'

export const normalizePort = (val: number | string): number | string | boolean => {
    let port: number = (typeof val === 'string') ? parseInt(val) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

export const onError = (server: Server) => {
    return (error: NodeJS.ErrnoException): void => {
        let port: number | string = server.address().port;
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

export const onListening = (server: Server) => {
    return (): void => {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening at ${bind}... time: ${Date.now()}`);
    }
}

export const handleError = (error: Error) => {
    let errorMessage: string = `${error.name}: ${error.message}`;
    let env: string = process.env.NODE_ENV;
    if (env !== 'test' && env !== 'pipelines') { console.log(errorMessage); }
    return Promise.reject(new Error(errorMessage));
}

export const throwError = (condition: boolean, message: string): void => {
    if (condition) { throw new Error(message); }
};

export const getTimeNow = () => {
    let now = new Date
    return now.getDate()
}

export const sendEmailNow = (args) => {
    const message = Object.assign({}, args.body);

    MailService.to = message.to;
    MailService.subject = message.subject;
    MailService.message = message.message;
    let result = MailService.sendMail();

    return result
}

export const writeFile = (file) => {
    if (file === '' || file === undefined) return ''
    if(isUrl(file)) return file

    let base64Image = file.split(';base64,').pop()
    createDir()
    let date = new Date()
    let time_stamp = date.getTime()
    let path_destino = `./uploads/${time_stamp}.jpg`

    fs.writeFile(path_destino, base64Image, { encoding: 'base64' }, (err) => {
        console.log(`PAHT: ${path_destino}`)
    })
    return `${getUrl()}/uploads/${time_stamp}.jpg`
}

export const imgPadrao = () => {
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5YznahbCcaCBgKJ4j6nYvPHTYEt5MX9tAaQlrXnMjPNKtQVS6'
}

export const createDirectoryUpload = () => {
    createDir()
}

export const photoHandler = (args) => {
    let base64String
    if (args.photo) {
        base64String = args.photo
        args.photo = writeFile(base64String)
    } else {
        args.photo = imgPadrao()
    }
    return args.photo
}

export const uploadFile_Temp_ = (args) => {

    if (!args.files) return false
    let date = new Date()
    let time_stamp = date.getTime()
    let url_img = `${time_stamp}_${args.files.arquivo.originalFilename}`
    let path_origem = args.files.arquivo.path
    let path_destino = `${PATH_IMG}/${url_img}`
    createDir()

    fs.rename(path_origem, path_destino, (err) => {
        if (err) return false
        return true
    })
}

export const getUrl = () => {
    if (process.env.NODE_ENV == 'production') return `http://142.93.115.52:${process.env.port}`
    return 'http://localhost:3000'
}

export const JWT_SECRET: string = process.env.JWT_SECRET

export const PATH_IMG: string = './uploads'

function separaConsole() {
    console.log('*=====================================================================*')
    console.log('////')
}

function createDir() {
    var dir = PATH_IMG
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
}

function isUrl(str) {
    //SE FOR UMA URL - NAO PRECISA CONVERTER
    const regex = /\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]/i;
    let m
    let ret = false

    if ((m = regex.exec(str)) !== null) {
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
            ret = true
        });
    }
    
    return ret
}