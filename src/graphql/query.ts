import { userQueries } from "./resources/user/user.schema";
import { postQueries } from "./resources/post/post.schema";
import { commentQueries } from "./resources/comment/comment.schema";
import { complaintQueries } from "./resources/complaints/complaints.schema";
import { serviceQueries } from "./resources/service/service.schema";
import { scheduleQueries } from "./resources/schedule/schedule.schema";
import { paymentQueries } from "./resources/payments/payment.schema";

const Query = `
    type Query{
        ${commentQueries}
        ${postQueries}
        ${userQueries}
        ${complaintQueries}
        ${serviceQueries}
        ${scheduleQueries}
        ${paymentQueries}
    }
`

export {
    Query
}