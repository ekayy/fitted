import React from 'react';
import styled from 'styled-components';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { EvilIcons } from '@expo/vector-icons';
import { postComment, postReply } from '../../Redux/CommentsRedux';
import { syncGarmentComments, syncGarmentCommentReplies } from '../../Redux/GarmentsRedux';
import { syncFitComments } from '../../Redux/FitsRedux';
import * as Yup from 'yup';

const CommentInputSchema = Yup.object().shape({
  content: Yup.string()
    .min(5, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Required')
});

const CommentInput = props => {
  const dispatch = useDispatch();
  const { profileId } = useSelector(state => ({
    profileId: state.user.profileId
  }));
  const { closeModal, data, contentType, objectId, isReplyInput } = props;
  const { content, downvotes, upvotes, username, id } = data;

  const onSubmit = async ({ content }) => {
    if (isReplyInput) {
      const data = {
        commentId: id,
        profileId,
        content
      };

      const reply = await dispatch(postReply(data));
      if (contentType === 'garment') await dispatch(syncGarmentCommentReplies(reply, objectId));
    } else {
      const data = {
        contentType,
        objectId,
        profileId,
        content
      };

      const comment = await dispatch(postComment(data));
      // Update garments redux state
      if (contentType === 'garment') await dispatch(syncGarmentComments(comment));
      // if (contentType === 'fit') await dispatch(syncFitComments(res));
    }

    closeModal();
  };

  return (
    <StyledModal>
      <Formik
        initialValues={{ content: '' }}
        validationSchema={CommentInputSchema}
        onSubmit={values => onSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ flex: 1 }}>
            <StyledModalHeader>
              <TouchableOpacity onPress={closeModal}>
                <EvilIcons name="close" size={25} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSubmit}>
                <Text>Post</Text>
              </TouchableOpacity>
            </StyledModalHeader>

            <StyledText>{content}</StyledText>

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

            <StyledErrorWrapper>
              {errors.content && touched.content ? (
                <StyledError>{errors.content}</StyledError>
              ) : null}
            </StyledErrorWrapper>
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

const StyledError = styled.Text`
  color: red;
  padding: 10px 20px;
  border: 1px solid red;
  width: 100%;
`;

const StyledErrorWrapper = styled.View`
  position: absolute;

  bottom: 50px;
`;

export default CommentInput;
