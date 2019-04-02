const userTypes = `

    # User definition type
    type User {
        id: ID!
        name: String!
        email: String!
        contact_1: String
        contact_2: String
        rating: Float!
        photo: String
        price: Float
        cpf: Int
        description: String
        cdempresa: Int
        createdAt: String!
        updatedAt: String!
        services(first: Int, offset: Int): [ Service! ]!
        payments(first: Int, offset: Int): [ Payment! ]!
    }

    input UserCreateInput {
        name: String!
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name: String!
        email: String!
        photo: String!
        contact_1: String
        contact_2: String
        flcleaner: Boolean
        price : Float
        description: String
        rating: Float
        cpf: Int
    }

    input UserUpdatePasswordInput {
        password: String!
    }

`

const userQueries = `
    users(first: Int, offset: Int): [ User! ]!
    user(id: ID!): User
    currentUser: User
`

const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    updateUserPassword(input: UserUpdatePasswordInput!): Boolean
    deleteUser: Boolean
`

export {
    userTypes,
    userQueries,
    userMutations
}
