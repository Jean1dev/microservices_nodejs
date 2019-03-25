import { userMutations } from "./resources/user/user.schema";
import { postMutations } from "./resources/post/post.schema";
import { commentMutations } from "./resources/comment/comment.schema";
import { tokenMutations } from "./resources/token/token.schema";
import { complaintMutations } from "./resources/complaints/complaints.schema";
import { serviceMutations } from "./resources/service/service.schema";
import { scheduleMutations } from "./resources/schedule/schedule.schema";
import { paymentMutations } from "./resources/payments/payment.schema";

const Mutation = `
    type Mutation {
        ${commentMutations}
        ${postMutations}
        ${tokenMutations}
        ${userMutations}
        ${complaintMutations}
        ${serviceMutations}
        ${scheduleMutations}
        ${paymentMutations}
    }
`

export {
    Mutation
}