/**
 * Primary file for GraphQL Schema
 */

import { gql } from 'apollo-server-express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../resolvers/index';

const typeDefs = gql`
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

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req, connection, payload }: any) => {
    if (connection) {
      return { isAuth: payload.authToken, userId: req?.userId ?? '' };
    }
    return { isAuth: req.isAuth, userId: req?.userId ?? '' };
  },
  playground: true
};

export default schema;
