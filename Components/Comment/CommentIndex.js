import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity
} from 'react-native';

import { Formik, ErrorMessage } from 'formik';

import CommentList from './CommentList';
import CommentInput from './CommentInput';

const CommentIndex = props => {
  const [commentValue, onChangeComment] = useState('');
  const [showModal, setModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  const { comment, contentType } = props.navigation.state.params;

  useEffect(() => {
    props.navigation.setParams({
      openModal: () => openModal(comment)
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
          data={[comment]}
          numReplies={9999}
          contentType={contentType}
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
          isReplyInput
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

CommentIndex.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <StyledHeaderButton onPress={navigation.getParam('openModal')}>
      <Text>Leave Reply</Text>
    </StyledHeaderButton>
  )
});

const StyledHeaderButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export default CommentIndex;
