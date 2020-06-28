"use strict";
/**
 * Define middlerware for extracting authToken
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const config_1 = tslib_1.__importDefault(require("../../config"));
exports.default = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config_1.default.jwtSecret);
    }
    catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    return next();
};
//# sourceMappingURL=auth.js.map