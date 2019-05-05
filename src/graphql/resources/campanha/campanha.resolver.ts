import { CampanhaPersistence } from './../../../persistence/CampanhaPersistence';
import { DbConnection } from "../../../interface/DbConnectionInterface";
import { DataLoaders } from "../../../interface/DataLoadersInterface";
import { GraphQLResolveInfo } from "graphql";
import { handleError, throwError } from "../../../utils/utils";
import { ResolverContext } from "../../../interface/ResolverContext";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interface/AuthUserInterface";
import { RequestedFields } from '../../ast/RequestedFields';

export const campanhaResolvers = {
    Campanha: {
        iduser: (parent, args, { db, dataloaders: { userLoader } }: { db: DbConnection, dataloaders: DataLoaders }, info: GraphQLResolveInfo) => {
            return userLoader.load({ key: parent.get('iduser'), info }).catch(handleError)
        },

        idcarteira: (parent, { first = 10, offset = 0 }, { db, requestedFields }: { db: DbConnection, requestedFields: RequestedFields }, info: GraphQLResolveInfo) => {
            return db.Carteira.findAll({
                where: { id: parent.get('idcarteira')}
            })
        }
    },

    Query: {
        campanhas: compose(...authResolvers)(async (parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            let data = new CampanhaPersistence
            return await data.getAllByIdUser(authUser.id)
        }),

        campanha: compose(...authResolvers)(async (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            let data = new CampanhaPersistence
            return await data.getOne(id)
        })
    },

    Mutation: {
        createCampanha: compose(...authResolvers)(async (parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            input.iduser = authUser.id
            let data = new CampanhaPersistence
            let ret = await data.save(input)
            return ret
        }),

        updateCampanha: compose(...authResolvers)(async (parent, { id, input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            id = parseInt(input.id)
            let data = new CampanhaPersistence
            let res = await data.update(id, input)
            throwError(res.get('iduser') != authUser.id, `Unauthorized! You can only edit Campanha by yourself!`)
            return res
        }),
    },
}