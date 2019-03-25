const complaintType = `

    type Complaint{
        id: ID!
        description: String!
        cause: String!
        createdAt: String!
        updated: String!
        author: User!
    }


    input ComplaintInput {
        description: String!
        cause: String!
    }

`

const complaintQueries = `
    complaints(first: Int, offset: Int): [ Complaint! ]!
    complaint(id: ID!): Complaint
`

const complaintMutations = `
    createComplaint(input: ComplaintInput!): Complaint
    deleteComplaint: Boolean
`

export {
    complaintType,
    complaintQueries,
    complaintMutations
}