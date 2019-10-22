import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

import CommentActions from './CommentActions';
import CommentReply from './CommentReply';

const CommentSingle = props => {
  const {
    renderViewComments,
    renderLeaveComment,
    viewComments,
    leaveComment,
    data
  } = props;

  const { content, downvotes, upvotes, username } = data;

  return (
    <StyledCommentSingle>
      <StyledCommentLink>{username}</StyledCommentLink>

      <StyledCommentText>{content}</StyledCommentText>

      <CommentActions
        data={data}
        renderViewComments={renderViewComments}
        renderLeaveComment={renderLeaveComment}
        viewComments={viewComments}
        leaveComment={leaveComment}
      />

      {/* {hasReply && <CommentReply />} */}
    </StyledCommentSingle>
  );
};

const StyledCommentSingle = styled.View`
  padding: 15px 20px 0 20px;
  /* border-bottom-width: 1px;
  border-bottom-color: #ccc; */
`;

const StyledCommentText = styled.Text`
  line-height: 20;
`;

const StyledCommentLink = styled.Text`
  margin-bottom: 10;
  /* color: #00bfff; */
`;

export default CommentSingle;