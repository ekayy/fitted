import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { EvilIcons } from '@expo/vector-icons';
import { postComment } from '../../Redux/CommentsRedux';

const CommentInput = props => {
  const { closeModal } = props;

  const dispatch = useDispatch();

  const onSubmit = ({ content }) => {
    const data = {
      contentType: 'fit',
      objectId: 1,
      profileId: 52,
      content
    };

    dispatch(postComment(data));
  };

  return (
    <StyledModal>
      <Formik
        initialValues={{ content: '' }}
        onSubmit={values => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <StyledModalHeader>
              <TouchableOpacity onPress={closeModal}>
                <EvilIcons name="close" size={25} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSubmit}>
                <Text>Post</Text>
              </TouchableOpacity>
            </StyledModalHeader>

            <StyledText>
              Sit excepteur culpa voluptate irure irure cupidatat sint
              adipisicing nisi aliquip qui. Cupidatat non nostrud duis sit. Ut
              amet ex ea officia tempor eu tempor duis pariatur in qui
              consequat.
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
                onBlur={handleBlur('content')}
                value={values.content}
                onChangeText={handleChange('content')}
              />
            </StyledInput>
          </View>
        )}
      </Formik>
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
