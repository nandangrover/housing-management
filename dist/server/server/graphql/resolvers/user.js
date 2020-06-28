"use strict";
/**
 * File containing all user queries, mutations and subscriptions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscription = exports.UserMutation = exports.UserQueries = void 0;
const tslib_1 = require("tslib");
const apollo_server_1 = require("apollo-server");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const config_1 = tslib_1.__importDefault(require("../../../config"));
const user_1 = tslib_1.__importDefault(require("../../models/user"));
const merge_1 = require("./merge");
const pubsub = new apollo_server_1.PubSub();
const USER_ADDED = 'USER_ADDED';
/**
 * User Queries
 */
const UserQueries = {
    users: (parent, args, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (!context.isAuth) {
            throw new Error('Not Authenticated');
        }
        try {
            const users = yield user_1.default.find();
            return users.map((user) => {
                return merge_1.transformUser(user);
            });
        }
        catch (err) {
            throw err;
        }
    }),
    user: (parent, { userId }, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (!context.isAuth) {
            throw new Error('Not Authenticated');
        }
        try {
            const user = yield user_1.default.findById(userId);
            return merge_1.transformUser(user);
        }
        catch (err) {
            throw err;
        }
    })
};
exports.UserQueries = UserQueries;
/**
 * User Mutations
 */
const UserMutation = {
    createUser: (parent, { userInput }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findOne({
                email: userInput.email
            });
            if (user) {
                throw new Error('User already Exists');
            }
            else {
                console.log(userInput.password);
                const newUser = new user_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    email: userInput.email,
                    firstName: userInput.firstName,
                    lastName: userInput.lastName,
                    flat: userInput.flat,
                    permissions: ['member'],
                    password: yield bcrypt.hash(userInput.password, 10)
                });
                const savedUser = yield newUser.save();
                pubsub.publish(USER_ADDED, {
                    userAdded: merge_1.transformUser(savedUser)
                });
                const token = jsonwebtoken_1.default.sign({
                    userId: savedUser.id,
                    name: savedUser.get('firstName'),
                    permissions: savedUser.get('permissions')
                }, config_1.default.jwtSecret, {
                    expiresIn: '1d'
                });
                return {
                    userId: savedUser.id,
                    token,
                    tokenExpiration: 1
                };
            }
        }
        catch (error) {
            throw error;
        }
    }),
    login: (parent, { email, password }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findOne({ email });
            if (!user) {
                throw new Error('User does not Exists');
            }
            const valid = yield bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Incorrect password');
            }
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                name: user.firstName,
                permissions: user.permissions
            }, config_1.default.jwtSecret, {
                expiresIn: '1d'
            });
            return {
                userId: user.id,
                token,
                tokenExpiration: 1
            };
        }
        catch (err) {
            throw err;
        }
    }),
    updateUser: (parent, { userId, updateUser }, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // If not authenticated throw error
        if (!context.isAuth) {
            throw new Error('Not Authenticated');
        }
        try {
            const user = yield user_1.default.findByIdAndUpdate(userId, updateUser, {
                new: true
            });
            return merge_1.transformUser(user);
        }
        catch (error) {
            throw error;
        }
    })
};
exports.UserMutation = UserMutation;
/**
 * User Subscriptions
 */
const UserSubscription = {
    userAdded: {
        subscribe: () => pubsub.asyncIterator([USER_ADDED])
    }
};
exports.UserSubscription = UserSubscription;
//# sourceMappingURL=user.js.map