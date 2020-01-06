import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { KeyboardAvoidingView, Text, ScrollView, Modal } from 'react-native';

import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { withNavigationFocus } from 'react-navigation';

const CommentSingle = props => {
  let { id, contentType, objectId } = props.navigation.state.params;
  const comments = useSelector(state => state.comments.items);
  const comment = comments.filter(comment => comment.id === id);

  const [commentValue, onChangeComment] = useState('');
  const [showModal, setModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  useEffect(() => {
    props.navigation.setParams({
      openModal: () => openModal(comment[0])
    });
  }, []);

  const closeModal = () => {
    setModal(false);
    setCurrentComment({});
  };

  const openModal = comment => {
    setModal(true);
    setCurrentComment(comment);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <ScrollView>
        <CommentList
          {...props}
          data={comment}
          objectId={objectId}
          contentType={contentType}
          numReplies={1000}
        />
      </ScrollView>

      <Modal animationType="slide" transparent={false} visible={showModal}>
        <CommentInput
          data={currentComment}
          commentValue={commentValue}
          onChangeComment={text => onChangeComment(text)}
          closeModal={closeModal}
          openModal={openModal}
          contentType={contentType}
          objectId={objectId}
          isReplyInput
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

CommentSingle.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <StyledHeaderButton onPress={navigation.getParam('openModal')}>
      <Text>Leave Reply</Text>
    </StyledHeaderButton>
  )
});

const StyledHeaderButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

const StyledCommentList = styled.View`
  padding: 15px 20px 0 20px;
`;

const StyledCommentSingle = styled.View`
  margin-bottom: 10px;
`;

const StyledCommentText = styled.Text`
  line-height: 20;
`;

const StyledCommentLink = styled.Text`
  margin-bottom: 10px;
`;

export default withNavigationFocus(CommentSingle);
