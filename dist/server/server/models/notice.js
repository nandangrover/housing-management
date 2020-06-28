"use strict";
/**
 * Define model for Notice
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
/**
 * Notice Schema
 */
const noticeSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    file: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Notice', noticeSchema);
//# sourceMappingURL=notice.js.map