"use strict";
/**
 * File containing Express Configuration
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const middleware_1 = require("graphql-voyager/middleware");
const http = tslib_1.__importStar(require("http"));
const path_1 = tslib_1.__importDefault(require("path"));
const index_1 = tslib_1.__importDefault(require("../server/graphql/schema/index"));
const auth_1 = tslib_1.__importDefault(require("../server/middleware/auth"));
const index_2 = tslib_1.__importDefault(require("./index"));
class Express {
    constructor() {
        this.server = new apollo_server_express_1.ApolloServer(index_1.default);
        this.init = () => {
            /**
             * Creating an express application
             */
            this.express = express_1.default();
            /**
             * Middlerware for using CORS
             */
            this.express.use(cors_1.default({
                origin(origin, callback) {
                    /**
                     * Allow requests with no origin
                     * Like mobile apps or curl requests
                     */
                    if (!origin) {
                        return callback(null, true);
                    }
                    if (index_2.default.allowedOrigins.indexOf(origin) === -1) {
                        const msg = `The CORS policy for this site does not
          allow access from the specified Origin.`;
                        return callback(new Error(msg), false);
                    }
                    return callback(null, true);
                }
            }));
            /**
             *  Middlerware for extracting authToken
             */
            this.express.use(auth_1.default);
            this.server.applyMiddleware({ app: this.express });
            this.httpServer = http.createServer(this.express);
            /**
             * Installing subscription handlers
             */
            this.server.installSubscriptionHandlers(this.httpServer);
            // Serve static assets if in production
            if (process.env.NODE_ENV === 'production') {
                this.express.use(express_1.default.static(path_1.default.join(__dirname, '../../../', 'client', 'build')));
                this.express.get('*', (req, res) => {
                    res.sendFile(path_1.default.join(__dirname, '../../../', 'client', 'build', 'index.html'));
                });
            }
            this.express.use('/voyager', middleware_1.express({ endpointUrl: '/graphql' }));
        };
    }
}
exports.default = Express;
//# sourceMappingURL=express.js.map