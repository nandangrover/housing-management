"use strict";
/**
 * Define model for user
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
/**
 * User Schema
 */
const userSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    flat: {
        type: String,
        required: true
    },
    permissions: [{
            type: String,
            required: true
        }]
}, {
    timestamps: true
});
/**
 * Statics
 */
userSchema.statics = {
    /**
     * Get User
     * @param {ObjectId} id - The objectId of user.
     */
    get(id) {
        return this.findById(id)
            .execAsync()
            .then((user) => {
            if (user) {
                return user;
            }
        });
    }
};
/**
 * Methods
 */
userSchema.methods = {};
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.js.map