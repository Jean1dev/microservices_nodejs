import { DbConnection } from "../interface/DbConnectionInterface";
import { Observable } from "../../node_modules/apollo-link";

export abstract class GenericService<T> {

    constructor(
        private db: DbConnection
    ) {}

    getAll(): Observable<T[]>{
        return null
    }
}