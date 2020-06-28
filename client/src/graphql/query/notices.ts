/**
 * Get all users query
 */

import gql from 'graphql-tag';

const GET_NOTICES = gql`
query {
  notices {
    _id,
    description,
    createdAt,
    mimetype,
    updatedAt,
    status,
    user {
      firstName,
      lastName,
      email
    }
  }
}
`;

export default GET_NOTICES;
