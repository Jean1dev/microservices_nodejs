import { AuthUser } from './../../../interface/AuthUserInterface';
import { handleError } from './../../../utils/utils';
import { GraphQLResolveInfo } from 'graphql';
import { DataLoaders } from './../../../interface/DataLoadersInterface';
import { DbConnection } from './../../../interface/DbConnectionInterface';
import { ResolverContext } from '../../../interface/ResolverContext';
import { authResolvers } from '../../composable/auth.resolver';
import { compose } from '../../composable/composable.resolver';
import { CarteiraPersistence } from '../../../persistence/CarteiraPersistence';

export const carteiraResolvers = {

    Carteira: {
        iduser: (parent, args, { db, dataloaders: { userLoader } }: { db: DbConnection, dataloaders: DataLoaders }, info: GraphQLResolveInfo) => {
            return userLoader.load({ key: parent.get('iduser'), info }).catch(handleError)
        }
    },

    Query: {
        carteiras: compose(...authResolvers)(async (parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            let data = new CarteiraPersistence
            return await data.getAllByIdUser(authUser.id)
        }),

        carteira: compose(...authResolvers)(async (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            let data = new CarteiraPersistence
            return await data.getOne(id)
        })
    },

    Mutation: {
        createCarteira: compose(...authResolvers)(async (parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            input.iduser = authUser.id
            let data = new CarteiraPersistence
            return await data.save(input)
        }),

        updateCarteira: compose(...authResolvers)((parent, { input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {

        })
    }
}