const carteiraType = `

    type Carteira {
        id: ID!
        descricao: String!
        situacao: Boolean!
        cel_original: String!
        limite_envio: Int!
        iduser: User
    }

    input CateiraCreateInput {
        id: ID
        descricao: String!
        situacao: Boolean!
        cel_original: String!
        limite_envio: Int!
    }
`

const carteiraQueries = `
    carteiras(first: Int, offset: Int): [ Carteira! ]!
    carteira(id: ID!): Carteira
`

const carteiraMutations = `
    createCarteira(input: CateiraCreateInput!): Carteira
    updateCarteira(input: CateiraCreateInput!): Carteira
`

export {
    carteiraType,
    carteiraQueries,
    carteiraMutations
}