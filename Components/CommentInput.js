import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';

const CommentInput = props => {
  const { commentValue, onChangeComment, closeModal } = props;

  const handleSubmit = () => {};

  return (
    <StyledModal>
      <StyledModalHeader>
        <TouchableOpacity onPress={closeModal}>
          <EvilIcons name="close" size={25} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Post</Text>
        </TouchableOpacity>
      </StyledModalHeader>

      <StyledText>
        Sit excepteur culpa voluptate irure irure cupidatat sint adipisicing
        nisi aliquip qui. Cupidatat non nostrud duis sit. Ut amet ex ea officia
        tempor eu tempor duis pariatur in qui consequat.
      </StyledText>

      <StyledInput>
        <TextInput
          style={{ height: 400 }}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
          placeholder="Add a comment"
          keyboardType="twitter" // keyboard with no return button
          autoFocus={true}
          onFocus={text => {}}
          value={commentValue}
          onChangeText={onChangeComment}
          onSubmitEditing={handleSubmit}
        />
      </StyledInput>
    </StyledModal>
  );
};

const StyledModal = styled.View`
  flex: 1;
  padding: 40px 20px;
`;

const StyledModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const StyledText = styled.Text`
  margin-bottom: 20px;
`;

const StyledInput = styled.View`
  /* padding: 40px; */
`;

export default CommentInput;
