import { selectDistinctUsersBySchedule } from './../utils/gerenciadorSQl';
import { Response, NextFunction } from 'express';
import { GeneralController } from "./GeneralController";
import database from '../models'

export class ScheduleController extends GeneralController {

    init(): void {
        this.router.get('/getUsers:id', this.selectDistinctUsersBySchedule)
    }

    selectDistinctUsersBySchedule(req: any, res: Response, next: NextFunction) {
        console.log(req.params.id)
        let id = parseInt(req.params.id.replace(/[^\d]+/g,''))
        database.sequelize.query(selectDistinctUsersBySchedule(id)).then(users => {
            res.send(users)
        }, (err => res.send(err)))
    }
}

const scheduleController = new ScheduleController
scheduleController.init()

export default scheduleController.router