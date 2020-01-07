import React from 'react';
import styled from 'styled-components';
import { FlatList } from 'react-native';

import CommentActions from './CommentActions';

const CommentReplies = props => {
  const { data } = props;

  renderReply = item => {
    const { id, upvotes, downvotes, content, username } = item;

    return (
      <StyledCommentReplies>
        <StyledCommentText>{username}</StyledCommentText>

        <StyledCommentText>{content}</StyledCommentText>

        <CommentActions data={item} isReply />
      </StyledCommentReplies>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => renderReply(item)}
    />
  );
};

const StyledCommentReplies = styled.View`
  margin: 10px 0 10px 25px;
  padding: 10px 0 0 20px;
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

export default CommentReplies;
