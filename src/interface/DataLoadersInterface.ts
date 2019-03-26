import * as DataLoader from 'dataloader'
import { UserInstance } from '../models/UserModel';
import { DataLoaderParam } from './DataLoaderParamInterface';
import { ServiceInstance } from '../models/ServiceModel';

export interface DataLoaders {

    userLoader: DataLoader<DataLoaderParam<number>, UserInstance>
    serviceLoader: DataLoader<DataLoaderParam<number>, ServiceInstance>

}