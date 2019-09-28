import React from 'react';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CommentActions = props => {
  const { renderLinks, leaveComment } = props;

  return (
    <StyledCommentActions>
      {renderLinks && (
        <StyledCommentLinks>
          <StyledLink>View all comments</StyledLink>
          <StyledLink onPress={leaveComment}>Leave a comment</StyledLink>
        </StyledCommentLinks>
      )}

      <StyledCommentVotes>
        <FontAwesome name="caret-up" size={30} />
        <StyledCommentCount>282</StyledCommentCount>
        <FontAwesome name="caret-down" size={30} />
      </StyledCommentVotes>
    </StyledCommentActions>
  );
};

const StyledCommentActions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: ${props =>
    props.renderLinks ? 'space-between' : 'flex-end'};
`;

const StyledCommentLinks = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  /* align-items: center; */
`;

const StyledLink = styled.Text`
  flex: 1;
  color: #00bfff;
  border-right-width: 3px;
  border-right-color: #ccc;
`;

const StyledCommentVotes = styled.View`
  flex-direction: row;
  align-items: center;
  /* justify-content: flex-end; */
`;

const StyledCommentCount = styled.Text`
  padding: 0 10px;
`;

export default CommentActions;
