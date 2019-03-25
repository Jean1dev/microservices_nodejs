import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";
import { handleError, throwError } from "../../../utils/utils";
import { DbConnection } from "../../../interface/DbConnectionInterface";
import { DataLoaders } from "../../../interface/DataLoadersInterface";
import { ResolverContext } from "../../../interface/ResolverContext";
import { ScheduleInstance } from "../../../models/ScheduleModel";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interface/AuthUserInterface";
import { selectDistinctUsersBySchedule } from "../../../utils/gerenciadorSQl";

export const scheduleResolvers = {

    Schedule: {
        iduser: (parent, args, { db, dataloaders: { userLoader } }: { db: DbConnection, dataloaders: DataLoaders }, info: GraphQLResolveInfo) => {
            return userLoader.load({ key: parent.get('iduser'), info }).catch(handleError)
        }
    },

    Query: {
        schedules: (parent, { first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Schedule
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: undefined })
                }).catch(handleError);
        },

        schedule: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Schedule
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: undefined })
                })
                .then((res: ScheduleInstance) => {
                    throwError(!res, `schedule with id ${id} not found!`);
                    return res;
                }).catch(handleError);
        },

        myschedules: (parent, { id, first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Schedule
            .findAll({
                where: { author: id },
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: undefined })
            }).catch(handleError);
        },

        yourschedules: (parent, { id, first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Schedule
            .findAll({
                where: { iduser: id },
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: undefined })
            }).catch(handleError);
        },
        // DEPRECIADO
        cleanersBySchedule: (parent, { id, first = 10, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.sequelize.query(selectDistinctUsersBySchedule(id)).then(users => {
                return users
            }).catch(handleError)
        }
    },

    Mutation: {
        createSchedule: compose(...authResolvers)((parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Schedule
                    .create(input, { transaction: t });
            }).catch(handleError);
        }),

        updateSchedule: compose(...authResolvers)((parent, { id, input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Schedule
                    .findById(id)
                    .then((res: ScheduleInstance) => {
                        throwError(!res, `Schedule with id ${id} not found!`);
                        throwError(res.get('iduser') != authUser.id, `Unauthorized! You can only edit Schedules by yourself!`);
                        input.user = authUser.id;
                        return res.update(input, { transaction: t });
                    });
            }).catch(handleError);
        }),

        deleteSchedule: compose(...authResolvers)((parent, { id }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            id = parseInt(id)
            return db.sequelize.transaction((t: Transaction) => {
                return db.Schedule
                    .findById(id)
                    .then((res: ScheduleInstance) => {
                        throwError(!res, `Schedule with id ${id} not found!`)
                        throwError(res.get('iduser') != authUser.id, `Unauthorized! You can only delete Schedules by yourself!`)
                        return res.destroy({ transaction: t })
                            .then(res => !!res)
                    })
            }).catch(handleError)
        })
    }


}
/*
*/