/**
 * Create User Mutation
 */

import gql from 'graphql-tag';

const ADD_NOTICE = gql`

mutation addNotice($noticeInput: NoticeInput) {
    addNotice(noticeInput: NoticeInput) {
      _id,
      user {
        _id,
        firstName
      }
    }
  }
`;

export default ADD_NOTICE;