import { GeneralController } from './GeneralController';
import {Router, Request, Response, NextFunction} from 'express';
import * as formidable from 'formidable'
import { createDirectoryUpload, PATH_IMG } from '../utils/utils';
import * as fs from 'fs'
import * as url from 'url'
import * as mime from 'mime'
import MailService from '../services/MailService';

export class TempController extends GeneralController {

    constructor(){
        super()
    }

    init(): void {
        this.router.get('/uploads/*.*', this.get)
        this.router.post('/uploads', this.uploadphoto)
        this.router.get('/', this.showSite)
        this.router.post('/report', this.bugReporter)
    }

    showSite(req: any, res: Response, next: NextFunction) {
        res.end('not implemented')
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