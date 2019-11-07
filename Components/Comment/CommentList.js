import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { View, Text, FlatList, Modal } from 'react-native';

import CommentActions from './CommentActions';
import CommentReplies from './CommentReplies';
import CommentInput from './CommentInput';

const CommentList = props => {
  const {
    data,
    renderViewComments,
    renderLeaveComment,
    numReplies,
    navigation,
    contentType
  } = props;

  // Pass correct garment or fit id
  const { id } = navigation.state.params;

  const [commentValue, onChangeComment] = useState('');
  const [showModal, setModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  // useEffect(() => {
  //   props.navigation.setParams({
  //     openModal
  //   });
  // }, []);

  const closeModal = () => {
    setModal(false);
    setCurrentComment({});
  };

  const openModal = comment => {
    setModal(true);
    setCurrentComment(comment);
  };

  renderComment = item => {
    const { id, content, downvotes, upvotes, username, replies } = item;

    return (
      <StyledCommentList>
        <StyledCommentSingle>
          <StyledCommentLink>{username}</StyledCommentLink>

          <StyledCommentText>{content}</StyledCommentText>

          <CommentActions
            data={item}
            renderViewComments={renderViewComments}
            renderLeaveComment={renderLeaveComment}
            viewComments={() =>
              navigation.navigate('CommentIndex', {
                comment: item,
                contentType
              })
            }
            leaveComment={() => openModal(item)}
          />
        </StyledCommentSingle>

        <CommentReplies data={replies.slice(0, numReplies)} />
      </StyledCommentList>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => renderComment(item)}
      />

      <Modal animationType="slide" transparent={false} visible={showModal}>
        <CommentInput
          data={currentComment}
          commentValue={commentValue}
          onChangeComment={text => onChangeComment(text)}
          closeModal={closeModal}
          openModal={openModal}
          contentType={contentType}
          objectId={id}
          isReplyInput
        />
      </Modal>
    </View>
  );
};

const StyledCommentList = styled.View`
  padding: 15px 20px 0 20px;
`;

const StyledCommentSingle = styled.View``;

const StyledCommentText = styled.Text`
  line-height: 20;
`;

const StyledCommentLink = styled.Text`
  margin-bottom: 10;
`;

export default CommentList;
