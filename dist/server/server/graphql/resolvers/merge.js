"use strict";
/**
 * Primary file for extracting proper schema structured objects
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformNotice = exports.transformUser = exports.getUserNotices = exports.getNotice = exports.getUser = void 0;
const tslib_1 = require("tslib");
const date_1 = tslib_1.__importDefault(require("../../helpers/date"));
const notice_1 = tslib_1.__importDefault(require("../../models/notice"));
const user_1 = tslib_1.__importDefault(require("../../models/user"));
/**
 * Get user object with schema typing
 * @param id
 */
const getUser = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(id);
        return Object.assign(Object.assign({}, user._doc), { _id: user.id, createdAt: date_1.default(user._doc.createdAt), updatedAt: date_1.default(user._doc.updatedAt) });
    }
    catch (err) {
        throw err;
    }
});
exports.getUser = getUser;
/**
 * Get notice object with schema typing
 * @param id
 */
const getNotice = (id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const notice = yield notice_1.default.findById(id);
        return Object.assign(Object.assign({}, notice._doc), { _id: notice.id, createdAt: date_1.default(notice._doc.createdAt), updatedAt: date_1.default(notice._doc.updatedAt) });
    }
    catch (err) {
        throw err;
    }
});
exports.getNotice = getNotice;
/**
 * Get all notices for a particular user
 * @param id
 */
const getUserNotices = (userId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const notices = yield notice_1.default.find({ userId });
        return notices.map((notice) => {
            return transformNotice(notice);
        });
    }
    catch (err) {
        throw err;
    }
});
exports.getUserNotices = getUserNotices;
/**
 * Get user object with schema typing
 * @param user
 */
const transformUser = (user) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return Object.assign(Object.assign({}, user._doc), { _id: user.id, notices: getUserNotices(user.id), createdAt: date_1.default(user._doc.createdAt), updatedAt: date_1.default(user._doc.updatedAt) });
});
exports.transformUser = transformUser;
/**
 * Get notice object with schema typing
 * @param notice
 */
const transformNotice = (notice) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return Object.assign(Object.assign({}, notice._doc), { _id: notice.id, user: getUser(notice.userId), createdAt: date_1.default(notice._doc.createdAt), updatedAt: date_1.default(notice._doc.updatedAt) });
});
exports.transformNotice = transformNotice;
//# sourceMappingURL=merge.js.map