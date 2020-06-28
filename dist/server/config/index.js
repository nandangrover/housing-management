"use strict";
/**
 * Config file
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    db: process.env.DB,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    allowedOrigins: ['http://localhost:3000', 'https://housingmanagement.herokuapp.com/', 'http://localhost:4020']
};
//# sourceMappingURL=index.js.map