//fiz esse .ts para quando precisar fazer querys mais elaboradas escrevlas aqui
export const selectDistinctUsersBySchedule = (id) => {
    let query = `
    select distinct users.id as userid,
    users.name,
    users.email,
    users.photo,
    users.price,
    users.rating
    from schedules
    inner join users on users.id = schedules.iduser
    where schedules.author = ${id}   
    `
    return query
}

export const insertIDPagSeguro = (id) => {
    var regExp = /["|':=]/g;
    id = id.replace(regExp, '')
    console.log(id)
    let query = `
        insert into PagSeguro(id_pagseguro, createdAt, updatedAt) values("${String(id)}", CURDATE(), CURDATE())
    `
    return query
}