import { makeExecutableSchema } from 'graphql-tools'
import { Query } from './query';
import { Mutation } from './mutation';
import { userTypes } from './resources/user/user.schema';
import { merge } from 'lodash'
import { userResolvers } from './resources/user/user.resolver';
import { tokenTypes } from './resources/token/token.schema';
import { tokenResolvers } from './resources/token/token.resolvers';
import { serviceResolvers } from './resources/service/service.resolver';
import { serviceType } from './resources/service/service.schema';
import { paymentType } from './resources/payments/payment.schema';
import { scheduleType } from './resources/schedule/schedule.schema';
import { scheduleResolvers } from './resources/schedule/schedule.resolver';
import { paymentResolvers } from './resources/payments/payment.resolver';
import { campanhaType } from './resources/campanha/campanha.schema';
import { campanhaResolvers } from './resources/campanha/campanha.resolver';

const resolvers = merge(
    userResolvers,
    tokenResolvers,
    serviceResolvers,
    scheduleResolvers,
    paymentResolvers,
    campanhaResolvers
)

const SchemaDefinition = `
    type Schema{
        query: Query
        mutation: Mutation
    }
`

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        userTypes,
        tokenTypes,
        serviceType,
        paymentType,
        scheduleType,
        campanhaType
    ],
    resolvers
})