import { DbConnection } from "../../../interface/DbConnectionInterface";
import { DataLoaders } from "../../../interface/DataLoadersInterface";
import { GraphQLResolveInfo } from "graphql";
import { handleError, throwError } from "../../../utils/utils";
import { ResolverContext } from "../../../interface/ResolverContext";
import { ServiceInstance } from "../../../models/ServiceModel";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interface/AuthUserInterface";
import { Transaction } from "sequelize";

export const serviceResolvers = {

    Service: {
        iduser: (parent, args, { db, dataloaders: { userLoader } }: { db: DbConnection, dataloaders: DataLoaders }, info: GraphQLResolveInfo) => {
            return userLoader.load({ key: parent.get('iduser'), info }).catch(handleError)
        }
    },

    Query: {

        services: (parent, { first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Service
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: undefined })
                }).catch(handleError);
        },

        service: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Service
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: undefined })
                })
                .then((res: ServiceInstance) => {
                    throwError(!res, `Service with id ${id} not found!`);
                    return res;
                }).catch(handleError);
        }

    },

    Mutation: {

        createService: compose(...authResolvers)((parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            input.iduser = authUser.id;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Service
                    .create(input, { transaction: t });
            }).catch(handleError);
        }),

        updateService: compose(...authResolvers)((parent, { id, input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Service
                    .findById(id)
                    .then((res: ServiceInstance) => {
                        throwError(!res, `Service with id ${id} not found!`);
                        throwError(res.get('iduser') != authUser.id, `Unauthorized! You can only edit Services by yourself!`);
                        input.user = authUser.id;
                        return res.update(input, { transaction: t });
                    });
            }).catch(handleError);
        })

    }
}