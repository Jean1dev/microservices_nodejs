const serviceType = `

    type Service {
        id: ID!
        detail: String!
        date: String!
        passedTime: Float!
        idschedule: Schedule!
        iduser: User!
        idpayment: Payment!
    } 

    input ServiceCreateInput {
        detail: String!
        passedTime: Float!
    }
`

const serviceQueries = `
    services(first: Int, offset: Int): [ Service! ]!
    service(id: ID!): Service
`

const serviceMutations = `
    createService(input: ServiceCreateInput!): Service
    updateService(input: ServiceCreateInput!): Service
`

export {
    serviceQueries,
    serviceMutations,
    serviceType
}