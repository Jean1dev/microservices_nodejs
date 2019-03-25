import { writeFile, imgPadrao, photoHandler } from './../../../utils/utils';
import { parseNamedType } from "../../../../node_modules/@types/graphql/language/parser"
import { DbConnection } from "../../../interface/DbConnectionInterface"
import { GraphQLResolveInfo } from "../../../../node_modules/@types/graphql"
import { PostInstance } from "../../../models/PostModel"
import { Transaction } from "../../../../node_modules/@types/sequelize"
import { handleError, throwError } from "../../../utils/utils"
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interface/AuthUserInterface";
import { ResolverContext } from "../../../interface/ResolverContext";
import { DataLoaders } from "../../../interface/DataLoadersInterface";
import * as graphqlFileds from 'graphql-fields'


export const postResolvers = {

    Post: {

        author: (post, args, {db, dataloaders: {userLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {  
            return userLoader
                .load({key: post.get('author'), info})
                .catch(handleError)
        },

        comments: (post, { first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Comment
                .findAll({
                    where: {post: post.get('id')},
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info)
                })
                .catch(handleError)
        }

    },

    Query: {

        posts: (parent, { first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Post
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['comments']})
                }).catch(handleError)
        },

        post: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id)
            return context.db.Post
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['comments']})
                })
                .then((post: PostInstance) => {
                    throwError(!post, `Post with id ${id} not found!`)
                    return post
                }).catch(handleError)
        }

    },

    Mutation: {

        createPost: compose(...authResolvers)((parent, { input }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.author = authUser.id
            input.photo = photoHandler(input)
            return db.sequelize.transaction((t: Transaction) => {   
                return db.Post
                    .create(input, {transaction: t})
            }).catch(handleError)
        }),

        updatePost: compose(...authResolvers)((parent, { id, input }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id)
            
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        throwError(!post, `Post with id ${id} not found!`)
                        throwError(post.get('author') != authUser.id, `Unauthorized! You can only edit posts by yourself!`)
                        input.author = authUser.id
                        return post.update(input, {transaction: t})
                    })
            }).catch(handleError)
        }),

        deletePost: compose(...authResolvers)((parent, { id }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        throwError(!post, `Post with id ${id} not found!`)
                        throwError(post.get('author') != authUser.id, `Unauthorized! You can only delete posts by yourself!`)
                        return post.destroy({transaction: t})
                            .then(post => !!post)
                    })
            }).catch(handleError)
        }),

        addLike: ((parent, { id, input }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id)
            
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post
                    .findById(id)
                    .then((post: PostInstance) => {
                        throwError(!post, `Post with id ${id} not found!`)
                        input.author = authUser.id
                        return post.update(input, {transaction: t})
                    })
            }).catch(handleError)
        })

    }

}