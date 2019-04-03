import { CrudInterface } from '../interface/CRUDInterface';

export abstract class GenericPersistence<T> implements CrudInterface<T>{
    key: T;

    save(content: any) {
        throw new Error("Method not implemented.");
    }
    update(id: any) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
    getOne() {
        throw new Error("Method not implemented.");
    }
    destroy() {
        throw new Error("Method not implemented.");
    }

}