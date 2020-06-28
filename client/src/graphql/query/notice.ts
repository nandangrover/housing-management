/**
 * Get all users query
 */

import gql from 'graphql-tag';

const GET_NOTICES = gql`
query notice($noticeId: ID!) {
  notice(noticeId: $noticeId) {
    description,
    file,
    mimetype,
    createdAt,
    status,
    user {
      firstName,
      lastName,
      email,
      _id
    }
  }
}
`;

export default GET_NOTICES;
