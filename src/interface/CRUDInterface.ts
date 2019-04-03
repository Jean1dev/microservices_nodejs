
export interface CrudInterface<T>{

    key: T

    save(content)
    update(id)
    getAll()
    getOne()
    destroy()
}