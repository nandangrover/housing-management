/**
 * Get all users query
 */

import gql from 'graphql-tag';

const GET_USERS = gql`
query {
  users {
    _id,
    firstName,
    lastName,
    flat,
    email,
    notices {
      _id,
      status
    }
  }
}
`;

export default GET_USERS;
