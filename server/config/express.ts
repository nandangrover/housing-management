/**
 * File containing Express Configuration
 */

import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import * as http from 'http';
import path from 'path';
import schema from '../server/graphql/schema/index';
import auth from '../server/middleware/auth';
import config from './index';

class Express {
  public express: express.Application;
  public server: ApolloServer = new ApolloServer(schema);
  public httpServer: http.Server;
  public init = (): void => {
    /**
     * Creating an express application
     */
    this.express = express();
    /**
     * Ability to process huge files
     */
    this.express.use(bodyParser.json({limit: '50mb'}));
    /**
     * Middlerware for using CORS
     */
    this.express.use(
      cors({
        origin(origin, callback) {
          /**
           * Allow requests with no origin
           * Like mobile apps or curl requests
           */
          if (!origin) {
            return callback(null, true);
          }
          if (config.allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not
          allow access from the specified Origin.`;
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        }
      })
    );
    /**
     *  Middlerware for extracting authToken
     */
    this.express.use(auth);
    this.server.applyMiddleware({ app: this.express });
    this.httpServer = http.createServer(this.express);

    this.express.use(
      '/voyager',
      voyagerMiddleware({ endpointUrl: '/graphql' })
    );
    /**
     * Installing subscription handlers
     */
    this.server.installSubscriptionHandlers(this.httpServer);

    // Serve static assets if in production
    if (process.env.NODE_ENV === 'production') {
      this.express.use(express.static(path.join(__dirname, '../../../', 'client', 'build')));

      this.express.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../', 'client', 'build', 'index.html'));
      });
    }
  }
}

export default Express;
