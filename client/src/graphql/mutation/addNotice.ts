/**
 * Create User Mutation
 */

import gql from 'graphql-tag';

const ADD_NOTICE = gql`

mutation addNotice($noticeInput: NoticeInput) {
    addNotice(noticeInput: $noticeInput) {
      _id
    }
  }
`;

export default ADD_NOTICE;