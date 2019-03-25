import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";
import { DbConnection } from "../../../interface/DbConnectionInterface";
import { DataLoaders } from "../../../interface/DataLoadersInterface";
import { handleError, throwError } from "../../../utils/utils";
import { ResolverContext } from "../../../interface/ResolverContext";
import { PaymentInstance } from "../../../models/PaymentsModel";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interface/AuthUserInterface";

export const paymentResolvers = {

    Payment: {
        iduser: (parent, args, { db, dataloaders: { userLoader } }: { db: DbConnection, dataloaders: DataLoaders }, info: GraphQLResolveInfo) => {
            return userLoader.load({ key: parent.get('iduser'), info }).catch(handleError)
        }
    },

    Query: {
        payments: (parent, { first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Payment
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: undefined })
                }).catch(handleError);
        },

        payment: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Payment
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: undefined })
                })
                .then((res: PaymentInstance) => {
                    throwError(!res, `Payment with id ${id} not found!`);
                    return res;
                }).catch(handleError);
        },

        mypayments: (parent, {id, first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id)
            return context.db.Payment
                .findAll({
                    where: { iduser: id },
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: undefined })
                }).catch(handleError);
        }
    },

    Mutation: {
        createPayment: compose(...authResolvers)((parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            input.iduser = authUser.id;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Payment
                    .create(input, { transaction: t });
            }).catch(handleError);
        })
    }
}