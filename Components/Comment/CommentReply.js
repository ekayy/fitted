import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

import CommentActions from './CommentActions';

const CommentReply = () => {
  return (
    <StyledCommentReply>
      <StyledCommentLink>username2</StyledCommentLink>

      <StyledCommentText>You should definitely size up!</StyledCommentText>

      <CommentActions />
    </StyledCommentReply>
  );
};

const StyledCommentReply = styled.View`
  margin: 10px 0 10px 25px;
  padding: 10px 20px 0 20px;
  border-left-width: 3px;
  border-left-color: #ccc;
`;

const StyledCommentText = styled.Text`
  line-height: 20;
`;

const StyledCommentLink = styled.Text`
  margin-bottom: 10;
  color: #00bfff;
`;

export default CommentReply;
