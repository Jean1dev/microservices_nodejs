import { GenericPersistence } from "./GenericPersistence";
import db from '../models'
import { Transaction } from "sequelize";
import { handleError } from "../utils/utils";

export class CampanhaPersistence extends GenericPersistence<CampanhaPersistence> {

    public async save(content) {
        return await db.sequelize.transaction(async (t: Transaction) => {
            return await db.Campanha.create(content, { transaction: t })
        }).catch(handleError)
    }

    public async getAllByIdUser(id) {
        return await db.Campanha.findAll({ where: { iduser: id }})
    }
}