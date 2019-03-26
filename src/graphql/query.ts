import { userQueries } from "./resources/user/user.schema";
import { serviceQueries } from "./resources/service/service.schema";
import { scheduleQueries } from "./resources/schedule/schedule.schema";
import { paymentQueries } from "./resources/payments/payment.schema";

const Query = `
    type Query{
        ${userQueries}
        ${serviceQueries}
        ${scheduleQueries}
        ${paymentQueries}
    }
`

export {
    Query
}