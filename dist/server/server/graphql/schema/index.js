"use strict";
/**
 * Primary file for GraphQL Schema
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_express_1 = require("apollo-server-express");
const index_1 = tslib_1.__importDefault(require("../resolvers/index"));
const typeDefs = apollo_server_express_1.gql `
  type Query {
    users: [User!]!
    user(userId: ID!): User!
    notices: [Notice!]!
    notice(noticeId: ID!): Notice!
  }
  type Mutation {
    createUser(userInput: UserInput): AuthData!
    login(email: String!, password: String!): AuthData!
    updateUser(userId: ID!, updateUser: UpdateUser): User!

    addNotice(noticeInput: NoticeInput): Notice!
    updateNotice(userId: ID!, noticeId: ID!, updateNotice: UpdateNotice): Notice!
  }
  type Subscription {
    userAdded: User
    noticeAdded: Notice
  }

  """
  User Types
  """
  type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    flat: String!
    permissions: [String!]!
    notices: [Notice!]!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input UserInput {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    flat: String!
  }
  input UpdateUser {
    email: String
    firstName: String
    lastName: String
    password: String
    flat: String
  }

  """
  Notice Types
  """

  type Notice {
    _id: ID!
    userId: ID!
    description: String!
    status: Boolean!
    file: String
    mimetype: String!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  input NoticeInput {
    userId: ID!
    description: String!
    status: Boolean!
    file: Upload!
    fileName: String!
    mimetype: String!
  }

  input UpdateNotice {
    description: String
    status: Boolean
  }
`;
const schema = {
    typeDefs,
    resolvers: index_1.default,
    introspection: true,
    context: ({ req, connection, payload }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (connection) {
            return { isAuth: payload.authToken, userId: (_a = req === null || req === void 0 ? void 0 : req.userId) !== null && _a !== void 0 ? _a : '' };
        }
        return { isAuth: req.isAuth, userId: (_b = req === null || req === void 0 ? void 0 : req.userId) !== null && _b !== void 0 ? _b : '' };
    }),
    playground: true
};
exports.default = schema;
//# sourceMappingURL=index.js.map