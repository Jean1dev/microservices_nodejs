const SchemaNumber = require("../models/NumberStatisticModel")

export const store = async content => {
    const ret = await SchemaNumber.create(content)   
    return ret
}

export const getAll = async () => {
    const ret = await SchemaNumber.find({})
    return ret
}