import { GeneralController } from './GeneralController';
import { Response, NextFunction} from 'express';
import * as formidable from 'formidable'
import { createDirectoryUpload, PATH_IMG } from '../utils/utils';
import * as fs from 'fs'
import * as url from 'url'
import * as mime from 'mime'
import MailService from '../services/MailService';
import { isAuthorized } from '../middlewares/extract-jwt.middleware';
import { store, getAll } from '../persistence/NumberPersistence';
import * as path from 'path'

//ESSA CLASSE LIGA COM VARIAS OPERACOES Q EU NAO TIVE A CAPACIDADE DE SEPARAR
// EM OUTRAS
export class TempController extends GeneralController {

    constructor(){
        super()
    }

    init(): void {
        //URL root localhost/
        this.router.get('/uploads/*.*', this.get)
        this.router.post('/uploads', this.uploadphoto)
        this.router.get('/', this.showSite)
        this.router.post('/report', this.bugReporter)
        this.router.get('/token', this.validarToken)
        this.router.post('/mongo', this.testMongo)
    }


    public async testMongo(req: any, res: Response, next: NextFunction) {
        await store({
            author: "",
            number: req.body.number,
            sent: 1
        })
        return res.json(await getAll())
    }

    async validarToken(req: any, res: Response, next: NextFunction) {
        let authorization: string = req.get('authorization')
        if (await isAuthorized(req)){
            res.end('sim')
        }else {
            res.end('nao')
        }
        
    }

    showSite(req: any, res: Response, next: NextFunction) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public/')})
    }

    bugReporter(req: any, res: Response, next: NextFunction) {
        
        MailService.to = req.body.to
        MailService.subject = req.body.subject
        MailService.message = req.body.message
        MailService.sendMail()
        res.send(MailService)
    }

    get(req: any, res: Response, next: NextFunction) {
        let requestedUrl = url.parse(req.url).path
        let imgName = requestedUrl.substr(requestedUrl.lastIndexOf('/') + 1)
        let filePath = `${PATH_IMG}/${imgName}`

        try{
            if(!fs.existsSync(filePath)){
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({
                    status: false,
                    message: 'file not found'
                }))
            }

            let img = fs.readFileSync(filePath)
            res.writeHead(404, {'Content-Type': mime.getType(filePath)})
            res.end(img, 'binary')
        }catch(e){
            res.end('file not found')
        }
    }

    uploadphoto(req: any, res: Response, next: NextFunction) {
        let form = new formidable.IncomingForm()

        form.parse(req, (err, params, files) => {                 
            if(err) res.send('deu pau')

            let keys = Object.keys(files)
            
            if(keys.length == 0) res.send('nao tem arquivo')
            createDirectoryUpload()

            let oldpath = files[keys[0]].path
            let newpath = `${PATH_IMG}/${files[keys[0]].name}`
            fs.readFile(oldpath, (err, data) => {
                if(err) res.send(err)
                fs.writeFile(newpath, data, (err) => {
                    if(err) res.send(err)
                    fs.unlink(oldpath, (err) => {
                        if(err) res.send(err)
                        res.send('ok')
                    })
                })
            })
        })
    }
}

const tempController = new TempController()
tempController.init()

export default tempController.router