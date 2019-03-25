import { PagSeguroModel } from './../models/PagSeguroModel';
import { UserModel } from "../models/UserModel";
import { PostModel } from "../models/PostModel";
import { CommentModel } from "../models/CommentModel";
import { ComplainstModel } from "../models/ComplaintsModel";
import { ServiceModel } from "../models/ServiceModel";
import { ScheduleModel } from "../models/ScheduleModel";
import { PaymentModel } from "../models/PaymentsModel";
import { AddressModel } from "../models/AddressModel";
import { CityModel } from "../models/CityModel";

export interface ModelsInterface {
    User: UserModel
    Post: PostModel
    Comment: CommentModel
    Complaints: ComplainstModel
    Service: ServiceModel
    Schedule: ScheduleModel
    Payment: PaymentModel
    Address: AddressModel
    City: CityModel
    PagSeguro: PagSeguroModel
}