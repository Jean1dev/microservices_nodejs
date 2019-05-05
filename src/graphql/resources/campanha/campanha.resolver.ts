import { DataLoaders } from './../../../interface/DataLoadersInterface';
import { AuthUser } from './../../../interface/AuthUserInterface';
import { DbConnection } from './../../../interface/DbConnectionInterface';
import { GraphQLResolveInfo } from 'graphql';
import { ResolverContext } from './../../../interface/ResolverContext';
import { authResolvers } from '../../composable/auth.resolver';
import { compose } from '../../composable/composable.resolver';
import { CampanhaPersistence } from '../../../persistence/CampanhaPersistence';
import { handleError } from '../../../utils/utils';

export const campanhaResolvers = {
    Campanha: {
        iduser: (parent, args, { db, dataloaders: { userLoader } }: { db: DbConnection, dataloaders: DataLoaders }, info: GraphQLResolveInfo) => {
            return userLoader.load({ key: parent.get('iduser'), info }).catch(handleError)
        }
    },

    Query: {
        campanhas: compose(...authResolvers)(async (parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            let data = new CampanhaPersistence
            return await data.getAllByIdUser(authUser.id)
        }),

        campanha: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {

        }
    },

    Mutation: {
        createCampanha: compose(...authResolvers)(async (parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            input.iduser = authUser.id
            let data = new CampanhaPersistence
            let ret = await data.save(input)
            return ret
        }),

        updateCampanha: compose(...authResolvers)((parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            
        }),
    },
}