const campanhaType = `

    type Campanha {
        id: ID!
        hr_inicio: String
        dt_inicio: String
        total_contatos: Int
        total_descarte: Int
        mensagem: String
        mailing: String
        ativo: Boolean
        iduser: User
        idcarteira: Carteira
    }

    input CampanhaCreateInput {
        id: ID
        hr_inicio: String
        dt_inicio: String
        total_contatos: Int!
        total_descarte: Int!
        mensagem: String!
        mailing: String!
        ativo: Boolean
        idcarteira: Int
    }
`

const campanhaQueries = `
    campanhas(first: Int, offset: Int): [ Campanha ]!
    campanha(id: ID!): Campanha
`

const campanhaMutations = `
    createCampanha(input: CampanhaCreateInput!): Campanha
    updateCampanha(input: CampanhaCreateInput!): Campanha
`

export {
    campanhaType,
    campanhaQueries,
    campanhaMutations
}