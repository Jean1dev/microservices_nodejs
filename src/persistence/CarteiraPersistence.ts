import { GenericPersistence } from "./GenericPersistence";
import db from '../models'
import { Transaction } from "sequelize";
import { handleError } from "../utils/utils";

export class CarteiraPersistence extends GenericPersistence<CarteiraPersistence> {

    public async save(content) {
        return await db.sequelize.transaction(async (t: Transaction) => {
            return await db.Carteira.create(content, {transaction: t})
        }).catch(handleError)
    }


    public async getAllByIdUser(id) {
        return await db.Carteira.findAll({ where: { iduser: id }})
    }

    public async getOne(id) {
        return await db.Carteira.findById(id)
    }
}