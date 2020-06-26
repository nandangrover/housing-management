/**
 * Exporting all resolvers
 */

import { NoticeMutation, NoticeQueries, NoticeSubscription } from './notice';
import { UserMutation, UserQueries, UserSubscription } from './user';

const rootResolver = {
  Query: {
    ...UserQueries,
    ...NoticeQueries
    // Add other queries here
  },
  Mutation: {
    ...UserMutation,
    ...NoticeMutation
    // Add other mutations here
  },
  Subscription: {
    ...UserSubscription,
    ...NoticeSubscription
    // Add other subscriptions here
  }
};

export default rootResolver;
