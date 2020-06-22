import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Comment } from '../../types';

interface Props {
  data: Comment[];
  leaveReply(comment: Comment): void;
}

const CommentExcerpt: React.FC<Props> = ({ data, leaveReply }) => {
  const renderReply = (reply) => {
    const { id, content, username } = reply;

    return (
      <StyledReply key={id}>
        <StyledCommentHead>
          <StyledCommentLink>{username}</StyledCommentLink>
        </StyledCommentHead>
        <StyledCommentText>{content}</StyledCommentText>
      </StyledReply>
    );
  };

  const renderComment = (comment: Comment) => {
    const { id, content, username, replies } = comment;

    return (
      <StyledComments key={id}>
        <StyledComment>
          <StyledCommentHead>
            <StyledCommentLink>{username}</StyledCommentLink>
          </StyledCommentHead>
          <StyledCommentText>{content}</StyledCommentText>

          <StyledReplies>
            <StyledCommentLinks>
              {/* <StyledCommentLink onPress={() => loadMoreReplies(comment)}>
                View More
              </StyledCommentLink> */}
              <StyledCommentLink onPress={() => leaveReply(comment)}>Reply</StyledCommentLink>
            </StyledCommentLinks>
            {replies && replies.slice(0, 2).map((item) => renderReply(item))}
          </StyledReplies>
        </StyledComment>
      </StyledComments>
    );
  };

  return data.map((item) => renderComment(item));
};

const StyledComments = styled.View`
  padding: 15px 20px 0 20px;
`;
const StyledComment = styled.View``;
const StyledCommentText = styled.Text`
  line-height: 20px;
  margin-bottom: 10px;
`;
const StyledCommentHead = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledReplies = styled.View`
  padding: 10px 0 10px 20px;
`;
const StyledReply = styled.View`
  margin: 20px 0 10px 0;
  padding: 10px 0 10px 20px;
  border-left-width: 3px;
  border-left-color: #ccc;
`;

const StyledCommentLinks = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
const StyledCommentLink = styled.Text`
  color: #00bfff;
  margin-right: 20px;
`;

export default CommentExcerpt;
