const scheduleType = `

    type Schedule {
        id: ID!
        date: String!
        price: Float!
        dayTurn: String!
        accepted: String!
        frequencyWeek: Int!
        description: String!
        iduser: User!
        author: User!
    }

    input ScheduleInput {
        date: String!
        price: Float!
        author: Int!
        iduser: Int!
        accepted: Int!
        dayTurn: String
        frequencyWeek: Int
        description: String
    }
`

const scheduleQueries = `
    schedules(first: Int, offset: Int): [ Schedule! ]!
    schedule(id: ID!): Schedule
    cleanersBySchedule(id: ID!, first: Int, offset: Int): [ Schedule ]
    myschedules(id: ID!, first: Int, offset: Int): [ Schedule! ]!
    yourschedules(id: ID!, first: Int, offset: Int): [ Schedule! ]!
`

const scheduleMutations = `
    createSchedule(input: ScheduleInput!): Schedule
    updateSchedule(id: ID!, input: ScheduleInput!): Schedule
    deleteSchedule(id: ID!): Boolean
`

export {
    scheduleQueries,
    scheduleMutations,
    scheduleType
}