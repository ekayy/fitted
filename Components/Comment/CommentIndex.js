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
import { Input } from 'react-native-elements';
import { Formik, ErrorMessage } from 'formik';
import CommentSingle from './CommentSingle';
import CommentInput from './CommentInput';
import CommentReply from './CommentReply';

const CommentIndex = () => {
  const [commentValue, onChangeComment] = useState('');
  const [showModal, setModal] = useState(false);

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
          <CommentSingle hasReply leaveComment={openModal} />
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

const StyledInputToggle = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
`;

export default CommentIndex;
