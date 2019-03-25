const paymentType = `

    type Payment {
        id: ID!
        date: String!
        cost: Float!
        document: String!
        description: String!
        iduser: User!
    }

    input PaymentInput {
        date: String!
        cost: Float!
        document: String!
        description: String!
    }
`

const paymentQueries = `
    payments(first: Int, offset: Int): [ Payment! ]!
    mypayments(id: ID!,first: Int, offset: Int): [ Payment! ]!
    payment(id: ID!): Payment
`

const paymentMutations = `
    createPayment(input: PaymentInput!): Payment
`

export {
    paymentMutations,
    paymentQueries,
    paymentType
}