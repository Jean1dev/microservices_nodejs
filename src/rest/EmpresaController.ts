import { GeneralController } from './GeneralController';
import { Response, NextFunction } from 'express';

export class EmpresaController extends GeneralController{

    constructor() {
        super()
    }

    init(): void{
        this.router.post('/post', this.post)
    }

    post(req: any, res: Response, next: NextFunction) {
        res.send(req.body)
    }

}

const empresaController = new EmpresaController()
empresaController.init()

export default empresaController.router