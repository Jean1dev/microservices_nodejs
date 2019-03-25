import { GeneralController } from './GeneralController';
import { uploadFile_Temp_ } from './../utils/utils';
import { Response, NextFunction} from 'express';

export class UserController extends GeneralController {
    
    constructor(){
        super()
        this.init()
    }

    init(): void {
        this.router.post('/upload', this.upload)
    }

    upload(req: any, res: Response, next: NextFunction): void {
        if(!uploadFile_Temp_(req)) res.send('nao')
        res.send('ok')
    }
}

const userController = new UserController()
userController.init()

export default userController.router