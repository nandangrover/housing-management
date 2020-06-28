/**
 * New user added subscription
 */

import gql from 'graphql-tag';

const NOTICE_ADDED = gql`
  subscription {
    noticeAdded {
        _id,
        description,
        createdAt,
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

export default NOTICE_ADDED;
