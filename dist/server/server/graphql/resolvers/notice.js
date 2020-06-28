"use strict";
/**
 * File containing all user queries, mutations and subscriptions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeSubscription = exports.NoticeQueries = exports.NoticeMutation = void 0;
const tslib_1 = require("tslib");
const apollo_server_1 = require("apollo-server");
const fileUploader_1 = tslib_1.__importDefault(require("../../helpers/fileUploader"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const notice_1 = tslib_1.__importDefault(require("../../models/notice"));
const merge_1 = require("./merge");
const pubsub = new apollo_server_1.PubSub();
const NOTICE_ADDED = 'NOTICE_ADDED';
/**
 * Notice Queries
 */
const NoticeQueries = {
    notices: (parent, args, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (!context.isAuth) {
            throw new Error('Not Authenticated');
        }
        try {
            const notices = yield notice_1.default.find().sort({ createdAt: -1 });
            return notices.map((notice) => {
                return merge_1.transformNotice(notice);
            });
        }
        catch (err) {
            throw err;
        }
    }),
    notice: (parent, { noticeId }, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (!context.isAuth) {
            throw new Error('Not Authenticated');
        }
        try {
            const notice = yield notice_1.default.findById(noticeId);
            return merge_1.transformNotice(notice);
        }
        catch (err) {
            throw err;
        }
    })
};
exports.NoticeQueries = NoticeQueries;
/**
 * Notice Mutations
 */
const NoticeMutation = {
    addNotice: (parent, { noticeInput }, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (!context.isAuth) {
            throw new Error('Not Authenticated');
        }
        try {
            const data = yield fileUploader_1.default(noticeInput.fileName, noticeInput.file);
            const newNotice = new notice_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                userId: noticeInput.userId,
                description: noticeInput.description,
                status: noticeInput.status,
                file: data.Location,
                mimetype: noticeInput.fileName,
            });
            const savedNotice = yield newNotice.save();
            const transformed = yield merge_1.transformNotice(savedNotice);
            pubsub.publish(NOTICE_ADDED, {
                noticeAdded: transformed
            });
            return transformed;
        }
        catch (error) {
            throw error;
        }
    }),
    updateNotice: (parent, { userId, noticeId, updateNotice }, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // If not authenticated throw error
        if (!context.isAuth) {
            throw new Error('Not Authenticated');
        }
        if (context.userId !== userId) {
            throw new Error('Not Authenticated');
        }
        try {
            const notice = yield notice_1.default.findByIdAndUpdate(noticeId, updateNotice, {
                new: true
            });
            return merge_1.transformNotice(notice);
        }
        catch (error) {
            throw error;
        }
    })
};
exports.NoticeMutation = NoticeMutation;
/**
 * Notice Subscriptions
 */
const NoticeSubscription = {
    noticeAdded: {
        subscribe: () => pubsub.asyncIterator([NOTICE_ADDED])
    }
};
exports.NoticeSubscription = NoticeSubscription;
//# sourceMappingURL=notice.js.map