import { GeneralController } from './GeneralController';
import { Response, NextFunction } from 'express';
import { EmpresaPersistence } from '../persistence/EmpresaPersistence';

export class EmpresaController extends GeneralController{

    constructor() {
        super()
    }

    init(): void{
        this.router.post('/post', this.post)
        this.router.get('/post', this.get)
    }

    post(req: any, res: Response, next: NextFunction) {
        let db = new EmpresaPersistence()
        db.save(req.body).then((response) => {
            res.send(req.body)
        })
    }

    get(req: any, res: Response, next: NextFunction) {
        let db = new EmpresaPersistence()
        db.getAll().then(response => {
            res.send(response)
        })
    }

}

const empresaController = new EmpresaController()
empresaController.init()

export default empresaController.router