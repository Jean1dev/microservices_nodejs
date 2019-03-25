import { selectDistinctUsersBySchedule } from './../utils/gerenciadorSQl';
import PostModel from '../models/PostModel'
import { PostInstance } from './../models/PostModel';
import { Transaction } from 'sequelize';
import { Response, NextFunction } from 'express';
import { GeneralController } from './GeneralController';
import database from '../models'
import { handleError } from '../utils/utils';

export class PostController extends GeneralController {

    constructor() {
        super()
    }

    init(): void{
        this.router.post('/addlike', this.addlike)
        this.db = PostModel 
    }

    addlike(req: any, res: Response, next: NextFunction) {
        this.db.sequelize.transaction((t: Transaction) => {
            return this.db.Post.findById(req.body.id).then((post: PostInstance) => {
                return this.db.Post.update(req.body.id, {where : {
                    id: req.body.id
                }})
            })
        })
    }
}

const postController = new PostController()
postController.init()

export default postController.router