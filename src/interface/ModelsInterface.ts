import { PagSeguroModel } from './../models/PagSeguroModel';
import { UserModel } from "../models/UserModel";
import { ServiceModel } from "../models/ServiceModel";
import { ScheduleModel } from "../models/ScheduleModel";
import { PaymentModel } from "../models/PaymentsModel";
import { AddressModel } from "../models/AddressModel";
import { CityModel } from "../models/CityModel";
import { EmpresaModel } from '../models/Empresa';

export interface ModelsInterface {
    User: UserModel
    Service: ServiceModel
    Schedule: ScheduleModel
    Payment: PaymentModel
    Address: AddressModel
    City: CityModel
    PagSeguro: PagSeguroModel
    Empresa: EmpresaModel
}