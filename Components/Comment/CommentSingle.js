import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

import CommentActions from './CommentActions';
import CommentReply from './CommentReply';

const CommentSingle = props => {
  const { hasReply, viewComments, leaveComment } = props;

  return (
    <StyledCommentSingle>
      <StyledCommentLink>username1</StyledCommentLink>

      <StyledCommentText>
        Irure aliquip adipisicing ullamco officia labore eu ad consequat ipsum
        ad. Adipisicing tempor irure incididunt deserunt culpa proident aute
        voluptate deserunt proident sit cillum.
      </StyledCommentText>

      <CommentActions
        renderLinks
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
  color: #00bfff;
`;

export default CommentSingle;
