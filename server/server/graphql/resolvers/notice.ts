/**
 * File containing all user queries, mutations and subscriptions
 */

import { PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import uploadFile from '../../helpers/fileUploader';
import Notice from '../../models/notice';
import { transformNotice } from './merge';

const pubsub = new PubSub();

const NOTICE_ADDED = 'NOTICE_ADDED';

/**
 * Notice Queries
 */
const NoticeQueries = {
  notices: async (parent, args, context) => {
    if (!context.isAuth) {
      throw new Error('Not Authenticated');
    }
    try {
      const notices = await Notice.find().sort({ createdAt: -1 });
      return notices.map((notice) => {
        return transformNotice(notice);
      });
    } catch (err) {
      throw err;
    }
  },
  notice: async (parent, { noticeId }, context) => {
    if (!context.isAuth) {
      throw new Error('Not Authenticated');
    }
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
    if (!context.isAuth) {
      throw new Error('Not Authenticated');
    }

    try {
      const data = await uploadFile(noticeInput.fileName, noticeInput.file);

      const newNotice = new Notice({
        _id: new mongoose.Types.ObjectId(),
        userId: noticeInput.userId,
        description: noticeInput.description,
        status: noticeInput.status,
        file: data.Location,
        mimetype: noticeInput.fileName.split('.')[1]
      });
      const savedNotice = await newNotice.save();

      const transformed = await transformNotice(savedNotice);
      pubsub.publish(NOTICE_ADDED, {
        noticeAdded: transformed
      });
      return transformed;
    } catch (error) {
      throw error;
    }
  },

  updateNotice: async (parent, { userId, noticeId, updateNotice }, context) => {
    // If not authenticated throw error
    if (!context.isAuth) {
      throw new Error('Not Authenticated');
    }

    if (context.userId !== userId) {
      throw new Error('Not Authenticated');
    }
    try {
      const notice = await Notice.findByIdAndUpdate(noticeId, updateNotice, {
        new: true
      });
      return transformNotice(notice);
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
