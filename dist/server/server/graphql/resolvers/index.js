"use strict";
/**
 * Exporting all resolvers
 */
Object.defineProperty(exports, "__esModule", { value: true });
const notice_1 = require("./notice");
const user_1 = require("./user");
const rootResolver = {
    Query: Object.assign(Object.assign({}, user_1.UserQueries), notice_1.NoticeQueries
    // Add other queries here
    ),
    Mutation: Object.assign(Object.assign({}, user_1.UserMutation), notice_1.NoticeMutation
    // Add other mutations here
    ),
    Subscription: Object.assign(Object.assign({}, user_1.UserSubscription), notice_1.NoticeSubscription
    // Add other subscriptions here
    )
};
exports.default = rootResolver;
//# sourceMappingURL=index.js.map