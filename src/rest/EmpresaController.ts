import { GeneralController } from './GeneralController';
import { Response, NextFunction } from 'express';
import { EmpresaPersistence } from '../persistence/EmpresaPersistence';

export class EmpresaController extends GeneralController{

    constructor() {
        super()
    }

    init(): void{
        this.router.post('/post', this.post)
    }

    post(req: any, res: Response, next: NextFunction) {
        let db = new EmpresaPersistence()
        db.save(req.body).then((response) => {
            res.send(req.body)
        })
    }

}

const empresaController = new EmpresaController()
empresaController.init()

export default empresaController.router