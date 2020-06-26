/**
 * File containing all user queries, mutations and subscriptions
 */

import { PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import Notice from '../../models/notice';
import { transformNotice } from './merge';

const pubsub = new PubSub();

const NOTICE_ADDED = 'NOTICE_ADDED';

/**
 * Notice Queries
 */
const NoticeQueries = {
  notices: async (parent, args, context) => {
    if (!context.isAuth) { throw new Error('Not Authenticated'); }
    try {
      const notices = await Notice.find();
      return notices.map((notice) => {
        return transformNotice(notice);
      });
    } catch (err) {
      throw err;
    }
  },
  notice: async (parent, { noticeId }, context) => {
    if (!context.isAuth) { throw new Error('Not Authenticated'); }
    try {
      const notice = await Notice.findById(noticeId);
      return transformNotice(notice);
    } catch (err) {
      throw err;
    }
  }
};

/**
 * Notice Mutations
 */
const NoticeMutation = {
  addNotice: async (parent: any, { noticeInput }: any, context: any) => {
    if (!context.isAuth) { throw new Error('Not Authenticated'); }
    try {
      const newNotice = new Notice({
        _id: new mongoose.Types.ObjectId(),
        userId: noticeInput.userId,
        description: noticeInput.description,
        status: noticeInput.status,
        file: noticeInput.file
      });
      const savedNotice = await newNotice.save();

      const transformed = transformNotice(savedNotice);
      pubsub.publish(NOTICE_ADDED, {
        noticeAdded: transformed
      });
      return transformed;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Notice Subscriptions
 */
const NoticeSubscription = {
    noticeAdded: {
      subscribe: () => pubsub.asyncIterator([NOTICE_ADDED])
    }
};

export { NoticeMutation, NoticeQueries, NoticeSubscription };
