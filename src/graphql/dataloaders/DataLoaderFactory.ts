import { ServiceInstance } from './../../models/ServiceModel';
import * as DataLoader from 'dataloader'
import { DbConnection } from '../../interface/DbConnectionInterface';
import { RequestedFields } from '../ast/RequestedFields';
import { DataLoaders } from '../../interface/DataLoadersInterface';
import { DataLoaderParam } from '../../interface/DataLoaderParamInterface';
import { UserInstance } from '../../models/UserModel';
import { UserLoader } from './UserLoader';
import { ServiceLoader } from './ServiceLoader';

export class DataLoaderFactory {

    constructor(
        private db: DbConnection,
        private requestedFields: RequestedFields
    ) { }

    getLoaders(): DataLoaders {
        return {
            userLoader: new DataLoader<DataLoaderParam<number>, UserInstance>(
                (params: DataLoaderParam<number>[]) => UserLoader.batchUsers(this.db.User, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
            serviceLoader: new DataLoader<DataLoaderParam<number>, ServiceInstance>(
                (params: DataLoaderParam<number>[]) => ServiceLoader.batchServices(this.db.Service, params, this.requestedFields),
                { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
            ),
        }
    }
}