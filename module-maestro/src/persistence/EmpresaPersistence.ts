import { Transaction } from 'sequelize';
import db from '../models'
import { handleError } from '../utils/utils';
import { GenericPersistence } from './GenericPersistence';

export class EmpresaPersistence extends GenericPersistence<EmpresaPersistence> {

    public async save(content) {
        let result = await db.sequelize.transaction((t: Transaction) => {
            return db.Empresa.create(content, {transaction: t})
        }).catch(handleError)
    }

    public async getAll(){
        return await db.Empresa.findAll()
    }
}