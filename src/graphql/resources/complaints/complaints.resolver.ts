import { parseNamedType } from "../../../../node_modules/@types/graphql/language/parser";
import { DbConnection } from "../../../interface/DbConnectionInterface";
import { DataLoaders } from "../../../interface/DataLoadersInterface";
import { GraphQLResolveInfo } from "graphql";
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { RequestedFields } from "../../ast/RequestedFields";
import { ResolverContext } from "../../../interface/ResolverContext";
import { ComplaintsInstance } from "../../../models/ComplaintsModel";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interface/AuthUserInterface";
import { Transaction } from "../../../../node_modules/@types/sequelize";

export const complaintResolvers = {

    Complaint: {
    
        author: (parent, args, { db, dataloaders: { userLoader } }: { db: DbConnection, dataloaders: DataLoaders }, info: GraphQLResolveInfo) => {
            return userLoader.load({key: parent.get('author'), info }).catch(handleError)
        }
    },

    Query: {
        complaints: (parent, { first = 10, offset = 0}, {db, requestedFields}: {db: DbConnection, requestedFields: RequestedFields}, info: GraphQLResolveInfo) => {
            return db.Complaints.findAll({
                limit: first,
                offset: offset,
                attributes: requestedFields.getFields(info, {keep: undefined})
            }).catch(handleError)
        },

        complaint: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id)
            return context.db.Complaints.findById(id, {
                attributes: context.requestedFields.getFields(info, {keep: undefined})
            }).then((result: ComplaintsInstance) => {
                throwError(!result, `Complaint with id ${id} not found`)
                return result
            }).catch(handleError)
        }
    },

    Mutation: {
        createComplaint: compose(...authResolvers)((parent, { input }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.author = authUser.id
            return db.sequelize.transaction((t: Transaction) => {
                return db.Complaints.create(input, {transaction: t}).catch(handleError)
            })
        }),

        deleteComplaint: compose(...authResolvers)((parent, { id }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.Complaints.findById(id).then((result: ComplaintsInstance) => {
                    throwError(!result, `Complaint with id ${id} not found`)
                    throwError(result.get('author') != authUser.id, `Unauthorized! You can only delete complaints by yourself!`)
                    return result.destroy({transaction: t}).then(res => !!result)
                }).catch(handleError)
            })
        })
    }
}