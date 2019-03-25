import { makeExecutableSchema } from 'graphql-tools'
import { Query } from './query';
import { Mutation } from './mutation';
import { userTypes } from './resources/user/user.schema';
import { postTypes } from './resources/post/post.schema';
import { commentTypes } from './resources/comment/comment.schema';
import { merge } from 'lodash'
import { commentResolvers } from './resources/comment/comment.resolvers';
import { postResolvers } from './resources/post/post.resolvers';
import { userResolvers } from './resources/user/user.resolver';
import { tokenTypes } from './resources/token/token.schema';
import { tokenResolvers } from './resources/token/token.resolvers';
import { complaintType } from './resources/complaints/complaints.schema';
import { complaintResolvers } from './resources/complaints/complaints.resolver';
import { serviceResolvers } from './resources/service/service.resolver';
import { serviceType } from './resources/service/service.schema';
import { paymentType } from './resources/payments/payment.schema';
import { scheduleType } from './resources/schedule/schedule.schema';
import { scheduleResolvers } from './resources/schedule/schedule.resolver';
import { paymentResolvers } from './resources/payments/payment.resolver';

const resolvers = merge(
    commentResolvers, 
    postResolvers,
    userResolvers,
    tokenResolvers,
    complaintResolvers,
    serviceResolvers,
    scheduleResolvers,
    paymentResolvers
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
        postTypes,
        commentTypes,
        tokenTypes,
        complaintType,
        serviceType,
        paymentType,
        scheduleType
    ],
    resolvers
})