import { userMutations } from "./resources/user/user.schema";
import { tokenMutations } from "./resources/token/token.schema";
import { serviceMutations } from "./resources/service/service.schema";
import { scheduleMutations } from "./resources/schedule/schedule.schema";
import { paymentMutations } from "./resources/payments/payment.schema";
import { campanhaMutations } from "./resources/campanha/campanha.schema";

const Mutation = `
    type Mutation {
        ${tokenMutations}
        ${userMutations}
        ${serviceMutations}
        ${scheduleMutations}
        ${paymentMutations}
        ${campanhaMutations}
    }
`

export {
    Mutation
}