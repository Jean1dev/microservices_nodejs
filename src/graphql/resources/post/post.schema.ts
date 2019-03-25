const postTypes = `

    type Post {
        id: ID!
        title: String!
        content: String!
        photo: String
        createdAt: String!
        updated: String!
        likes: Int!
        author: User!
        comments(first: Int, offset: Int): [ Comment! ]!
    }

    input PostInput {
        id: ID
        title: String!
        content: String!
        photo: String
        likes: Int
    }

`

const postQueries = `
    posts(first: Int, offset: Int): [ Post! ]!
    post(id: ID!): Post
`

const postMutations = `
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Boolean
    addLike(id: ID!, input: PostInput!): Post
`

export {
    postTypes,
    postQueries,
    postMutations
}
