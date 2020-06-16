import React, { RefObject } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { postComment, postReply } from '../../Redux/CommentsRedux';
// import { syncGarmentComments, syncGarmentCommentReplies } from '../../Redux/GarmentsRedux';
// import { syncFitComments } from '../../Redux/FitsRedux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as Yup from 'yup';
import { MyTextInput } from '../Forms/MyTextInput';
import { useTypedSelector, ContentType, Comment } from '../../types';
import { Text, TextInput } from 'react-native';

interface CommentInputProps {
  currentComment: Comment;
  route: { params: { objectId: number; contentType: ContentType } };
  isReply: boolean;
  closeReply(): void;
  inputRef: RefObject<TextInput>;
}

const CommentInputSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(500, 'Too Long!').required(''),
});

const CommentInput: React.FC<CommentInputProps> = (props) => {
  const { route, currentComment, inputRef, isReply, closeReply } = props;
  const { id: commentId, username } = currentComment;

  // Navigation params
  const { objectId, contentType } = route.params;

  // Redux state
  const { profileId } = useTypedSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ content: '' }}
      validationSchema={CommentInputSchema}
      onSubmit={async ({ content }, { resetForm }) => {
        isReply
          ? await dispatch(postReply({ commentId, profileId, content }))
          : await dispatch(postComment({ contentType, objectId, profileId, content }));

        closeReply();
        resetForm({ values: { content: '' } });
      }}
    >
      {(props) => {
        const { handleSubmit } = props;

        return (
          <>
            {isReply && (
              <StyledReplyTo>
                <Text>Replying to {username}</Text>
                <StyledReplyClose onPress={closeReply}>
                  <EvilIcons name="close" size={25} />
                </StyledReplyClose>
              </StyledReplyTo>
            )}

            <StyledInputContainer>
              <StyledTextInputContainer>
                <MyTextInput
                  ref={inputRef}
                  {...props}
                  multiline
                  name="content"
                  placeholder="Write comment here"
                  testID="comment"
                  keyboardType="twitter"
                  onSubmitEditing={handleSubmit}
                  textAlignVertical="bottom"
                />
              </StyledTextInputContainer>

              <StyledPostButton onPress={handleSubmit}>
                <StyledPostButtonText>Post</StyledPostButtonText>
              </StyledPostButton>
            </StyledInputContainer>
          </>
        );
      }}
    </Formik>
  );
};

const StyledInputContainer = styled.View`
  width: 100%;
  background-color: #fcfcfc;
  padding: 10px 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const StyledTextInputContainer = styled.View`
  flex: 1;
`;
const StyledReplyTo = styled.View`
  background-color: #ddd;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
`;
const StyledReplyClose = styled.TouchableOpacity``;
const StyledPostButton = styled.TouchableOpacity`
  margin-left: 20px;
`;
const StyledPostButtonText = styled.Text``;

export default CommentInput;
