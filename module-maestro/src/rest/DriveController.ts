import { createDirectoryUpload, PATH_IMG } from './../utils/utils';
import { getAllByTitle, store, storeFile } from './../persistence/DrivePersistence';
import { GeneralController } from "./GeneralController";
import { Response, NextFunction} from 'express';
import { isAuthorized } from "../middlewares/extract-jwt.middleware";
import * as formidable from 'formidable'
import * as fs from 'fs'
/**
 * https://stackabuse.com/get-query-strings-and-parameters-in-express-js/
 */
export class DriveController extends GeneralController {

    public init(): void {
        this.router.get('/files', this.getAllFilesByUser)
        this.router.post('/files', this.uploaFile)
    }

    public async getAllFilesByUser(req: any, res: Response, next: NextFunction) {
        if(!await isAuthorized(req)) return res.end('nao autorizado')
        let { drive_name } = req.query
        if(drive_name == null || drive_name == undefined) return res.end('parammetro obrigatorio nao informado: drive_name')
        const ret =  await getAllByTitle(drive_name)
        return res.json(ret)
    }


    public async uploaFile(req: any, res: Response, next: NextFunction) {
        const teste = req.body.drive_name
        let form = new formidable.IncomingForm()
        storeFile({
            title: teste,
            name: req.body.file_name,
            path: `${PATH_IMG}/${req.body.file_name}_${req.body.drive_name}`
        })
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
                        return newpath
                    })
                })
            })
        })
    }

}

const drive = new DriveController()
drive.init()
export default drive.router