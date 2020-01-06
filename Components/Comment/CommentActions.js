import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  upvoteComment,
  downvoteComment,
  upvoteReply,
  downvoteReply
} from '../../Redux/CommentsRedux';

const CommentActions = props => {
  const {
    renderViewComments,
    renderLeaveComment,
    viewComments,
    leaveComment,
    data,
    isReply
  } = props;

  const { content, downvotes, upvotes, username, id } = data;

  const { commentId, profileId } = useSelector(state => ({
    commentId: id,
    profileId: state.user.profileId
  }));

  const dispatch = useDispatch();

  const handleUpvote = () => {
    isReply
      ? dispatch(upvoteReply(commentId, profileId))
      : dispatch(upvoteComment(commentId, profileId));
  };

  const handleDownvote = () => {
    isReply
      ? dispatch(downvoteReply(commentId, profileId))
      : dispatch(downvoteComment(commentId, profileId));
  };

  return (
    <StyledCommentActions>
      <StyledCommentLinks>
        {renderViewComments && <StyledLink onPress={viewComments}>View all comments</StyledLink>}
        {renderLeaveComment && <StyledLink onPress={leaveComment}>Leave a reply</StyledLink>}
      </StyledCommentLinks>

      <StyledCommentVotes>
        <TouchableOpacity onPress={handleUpvote}>
          <FontAwesome name="caret-up" size={30} />
        </TouchableOpacity>

        <StyledCommentCount>{upvotes - downvotes}</StyledCommentCount>

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
  justify-content: ${props => (props.renderLinks ? 'space-between' : 'flex-end')};
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
`;

const StyledCommentCount = styled.Text`
  padding: 0 10px;
`;

export default CommentActions;
