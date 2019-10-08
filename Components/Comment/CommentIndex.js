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

import CommentSingle from './CommentSingle';
import CommentInput from './CommentInput';
import CommentReply from './CommentReply';

const CommentIndex = ({ navigation }) => {
  const [commentValue, onChangeComment] = useState('');
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    navigation.setParams({
      openModal
    });
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  const handleSubmit = () => {};

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
      <ScrollView>
        <View>
          <CommentSingle leaveComment={openModal} />

          <CommentReply />
          <CommentReply />
          <CommentReply />
          <CommentReply />
          <CommentReply />
          <CommentReply />
          <CommentReply />
          <CommentReply />
          <CommentReply />
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={false} visible={showModal}>
        <CommentInput
          commentValue={commentValue}
          onChangeComment={text => onChangeComment(text)}
          closeModal={closeModal}
          openModal={openModal}
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
