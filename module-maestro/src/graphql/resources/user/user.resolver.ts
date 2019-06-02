import { UserInstance } from './../../../models/UserModel';
import { GraphQLResolveInfo } from "../../../../node_modules/@types/graphql"
import { DbConnection } from "../../../interface/DbConnectionInterface"
import { Transaction } from "../../../../node_modules/@types/sequelize"
import { handleError, throwError, photoHandler } from "../../../utils/utils"
import { authResolvers } from "../../composable/auth.resolver";
import { compose } from "../../composable/composable.resolver";
import { ResolverContext } from "../../../interface/ResolverContext";
import { RequestedFields } from "../../ast/RequestedFields";
import { AuthUser } from "../../../interface/AuthUserInterface";


export const userResolvers = {

    User: {

        /*posts: (user, { first = 10, offset = 0 }, { db, requestedFields }: { db: DbConnection, requestedFields: RequestedFields }, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    where: { author: user.get('id') },
                    limit: first,
                    offset: offset,
                    attributes: requestedFields.getFields(info, { keep: ['id'], exclude: ['comments'] })
                }).catch(handleError)
        },*/

        services: (user, { first = 10, offset = 0 }, { db, requestedFields }: { db: DbConnection, requestedFields: RequestedFields }, info: GraphQLResolveInfo) => {
            return db.Service
                .findAll({
                    where: { iduser: user.get('id') },
                    limit: first,
                    offset: offset,
                    attributes: requestedFields.getFields(info)
                }).catch(handleError)
        },

        campanhas: (user, { first = 10, offset = 0 }, { db, requestedFields }: { db: DbConnection, requestedFields: RequestedFields }, info: GraphQLResolveInfo) => {
            return db.Campanha
                .findAll({
                    where: { iduser: user.get('id') },
                    limit: first,
                    offset: offset
                }).catch(handleError)
        }

        /*complaints: (user, { first = 10, offset = 0 }, { db, requestedFields }: { db: DbConnection, requestedFields: RequestedFields }, info: GraphQLResolveInfo) => {
            return db.Complaints
                .findAll({
                    where: { author: user.get('id') },
                    limit: first,
                    offset: offset,
                    attributes: requestedFields.getFields(info)
                }).catch(handleError)
        },*/

    },

    Query: {

        users: (parent, { first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.User
                .findAll({
                    //where: {},
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['services', 'payments'] })
                }).catch(handleError)
        },

        user: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id)
            return context.db.User
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['services', 'payments'] })
                })
                .then((user: UserInstance) => {
                    throwError(!user, `User with id ${id} not found!`)
                    return user
                }).catch(handleError)
        },

        currentUser: compose(...authResolvers)((parent, args, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.User
                .findById(context.authUser.id, {
                    attributes: context.requestedFields.getFields(info, { keep: ['id']})
                })
                .then((user: UserInstance) => {
                    throwError(!user, `User with id ${context.authUser.id} not found!`)
                    return user
                }).catch(handleError)
        })

    },

    Mutation: {

        createUser: (parent, { input }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            input.photo = photoHandler(input)
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .create(input, { transaction: t })
            }).catch(handleError)
        },

        updateUser: compose(...authResolvers)((parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            input.photo = photoHandler(input)
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(authUser.id)
                    .then((user: UserInstance) => {
                        throwError(!user, `User with id ${authUser.id} not found!`)
                        
                        return user.update(input, { transaction: t })
                    })
            }).catch(handleError)
        }),

        updateUserPassword: compose(...authResolvers)((parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(authUser.id)
                    .then((user: UserInstance) => {
                        throwError(!user, `User with id ${authUser.id} not found!`)
                        return user.update(input, { transaction: t })
                            .then((user: UserInstance) => !!user)
                    })
            }).catch(handleError)
        }),

        deleteUser: compose(...authResolvers)((parent, args, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(authUser.id)
                    .then((user: UserInstance) => {
                        throwError(!user, `User with id ${authUser.id} not found!`)
                        return user.destroy({ transaction: t })
                            .then(user => !!user)
                    })
            }).catch(handleError)
        })

    }

}