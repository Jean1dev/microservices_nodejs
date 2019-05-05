import { GenericPersistence } from "./GenericPersistence";
import db from '../models'
import { Transaction } from "sequelize";
import { handleError, throwError } from "../utils/utils";

export class CampanhaPersistence extends GenericPersistence<CampanhaPersistence> {

    public async save(content) {
        return await db.sequelize.transaction(async (t: Transaction) => {
            return await db.Campanha.create(content, { transaction: t })
        }).catch(handleError)
    }

    public async update(id, content) {
        return await db.sequelize.transaction(async (t: Transaction) => {
            let data = await db.Campanha.findById(id)
            throwError(!data, `Campanha with id ${id} not found!`)
            return await data.update(content, { transaction: t})
        }).catch(handleError)
    }

    public async getAllByIdUser(id) {
        return await db.Campanha.findAll({ where: { iduser: id }})
    }

    public async getOne(id) {
        return await db.Campanha.findById(id)
    }
}