import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { upvoteComment, downvoteComment } from '../../Redux/CommentsRedux';

const CommentActions = props => {
  const { renderLinks, viewComments, leaveComment } = props;

  const { commentId, profileId } = useSelector(
    state => ({
      commentId: 1,
      profileId: state.user.profileId
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const handleUpvote = () => {
    dispatch(upvoteComment(commentId, profileId));
  };

  const handleDownvote = () => {
    dispatch(downvoteComment(commentId, profileId));
  };

  return (
    <StyledCommentActions>
      {renderLinks && (
        <StyledCommentLinks>
          <StyledLink onPress={viewComments}>View all comments</StyledLink>
          <StyledLink onPress={leaveComment}>Leave a comment</StyledLink>
        </StyledCommentLinks>
      )}

      <StyledCommentVotes>
        <TouchableOpacity onPress={handleUpvote}>
          <FontAwesome name="caret-up" size={30} />
        </TouchableOpacity>

        <StyledCommentCount>282</StyledCommentCount>

        <TouchableOpacity onPress={handleDownvote}>
          <FontAwesome name="caret-down" size={30} />
        </TouchableOpacity>
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
