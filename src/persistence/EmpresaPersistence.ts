import { Transaction } from 'sequelize';
import  EmpresaModel  from './../models/Empresa';
import db from '../models'
import { handleError } from '../utils/utils';

export class EmpresaPersistence {

    public async save(content) {
        let result = await db.sequelize.transaction((t: Transaction) => {
            return db.Empresa.create(content, {transaction: t})
        }).catch(handleError)
        console.log(result)
    }
}