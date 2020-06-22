import React from 'react';
import styled from 'styled-components/native';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  upvoteComment,
  downvoteComment,
  upvoteReply,
  downvoteReply,
} from '../../Redux/CommentsRedux';

const CommentList = (props) => {
  const { data, ListHeaderComponent, loadMoreReplies, leaveReply, flatListRef } = props;

  // Redux State
  // const { commentId, profileId } = useSelector((state) => ({
  //   commentId: id,
  //   profileId: state.user.profileId,
  // }));

  // useEffect(() => {
  //   if (flatListRef.current) {
  //     flatListRef.current.scrollToIndex({ animated: true, index });
  //   }
  // }, []);

  const dispatch = useDispatch();

  const handleUpvote = () => {
    // isReply
    //   ? dispatch(upvoteReply(commentId, profileId))
    //   : dispatch(upvoteComment(commentId, profileId));
  };

  const handleDownvote = () => {
    // isReply
    //   ? dispatch(downvoteReply(commentId, profileId))
    //   : dispatch(downvoteComment(commentId, profileId));
  };

  const renderVotes = ({ upvotes, downvotes, id }) => (
    <StyledCommentVotes>
      <TouchableOpacity onPress={handleUpvote(id)}>
        <FontAwesome name="caret-up" size={30} style={{ color: '#ccc' }} />
      </TouchableOpacity>

      <StyledCommentCount>{upvotes - downvotes}</StyledCommentCount>

      <TouchableOpacity onPress={handleDownvote(id)}>
        <FontAwesome name="caret-down" size={30} style={{ color: '#ccc' }} />
      </TouchableOpacity>
    </StyledCommentVotes>
  );

  const renderReplies = (replies) => (
    <FlatList
      data={replies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => renderReply(item)}
    />
  );

  const renderReply = (reply) => {
    const { content, username } = reply;

    return (
      <StyledReply>
        <StyledCommentHead>
          <StyledCommentLink>{username}</StyledCommentLink>
          {renderVotes(reply)}
        </StyledCommentHead>
        <StyledCommentText>{content}</StyledCommentText>
      </StyledReply>
    );
  };

  const renderComment = (comment: Partial<Comment>, index: number) => {
    const { content, username, replies } = comment;

    return (
      <StyledComments>
        <StyledComment>
          <StyledCommentHead>
            <StyledCommentLink>{username}</StyledCommentLink>
            {renderVotes(comment)}
          </StyledCommentHead>
          <StyledCommentText>{content}</StyledCommentText>

          <StyledReplies>
            <StyledCommentLinks>
              <StyledCommentLink onPress={() => loadMoreReplies(comment)}>
                View More
              </StyledCommentLink>
              <StyledCommentLink onPress={() => leaveReply(comment, index)}>
                Reply
              </StyledCommentLink>
            </StyledCommentLinks>
            {replies && renderReplies(replies)}
          </StyledReplies>
        </StyledComment>
      </StyledComments>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => renderComment(item, index)}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
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

const StyledCommentVotes = styled.View`
  margin-top: -8px;
  flex-direction: row;
  /* justify-content: center; */
  /* align-items: center; */
`;

const StyledCommentCount = styled.Text`
  padding: 0 10px;
  margin-top: 8px;
`;

export default CommentList;
