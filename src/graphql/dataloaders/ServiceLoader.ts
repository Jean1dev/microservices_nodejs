import { RequestedFields } from './../ast/RequestedFields';
import { DataLoaderParam } from './../../interface/DataLoaderParamInterface';
import { ServiceModel, ServiceInstance } from './../../models/ServiceModel';
export class ServiceLoader {
    static batchServices(Service: ServiceModel, params: DataLoaderParam<number>[], requestedFields: RequestedFields): Promise<ServiceInstance[]> {
        
        let ids: number[] = params.map(param => param.key);

        return Promise.resolve(
            Service.findAll({
                where: { id: { $in: ids } },
                attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: undefined})
            })
        );
    }
}