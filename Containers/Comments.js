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
import { AppStyles } from '../Themes';
import CommentSingle from '../Components/Comment/CommentSingle';
import CommentInput from '../Components/Comment/CommentInput';

const Comments = ({ navigation }) => {
  const [searchValue, onChangeSearch] = useState('');
  const [commentValue, onChangeComment] = useState('');
  const [showModal, setModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});

  const { comments } = navigation.state.params;

  useEffect(() => {
    navigation.setParams({
      openModal
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

  const handleSubmit = () => {};

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView>
        <View>
          <Input
            placeholder="Search a question"
            keyboardType="twitter" // keyboard with no return button
            autoFocus={false}
            value={searchValue}
            onChangeText={text => onChangeSearch(text)}
            onSubmitEditing={handleSubmit}
          />

          <View style={AppStyles.section}>
            <View style={AppStyles.sectionTitle}>
              <Text style={AppStyles.sectionTitleText}>Discussion</Text>
              <Text>
                {`Showing 1-${comments.length < 10 ? comments.length : 10} of ${
                  comments.length
                } comments`}
              </Text>
            </View>
          </View>
        </View>

        <View>
          {comments.map(comment => (
            <CommentSingle
              // key={comment.}
              data={comment}
              renderViewComments
              renderLeaveComment
              // TODO: request to replies
              viewComments={() =>
                navigation.navigate('CommentIndex', { comment })
              }
              leaveComment={() => openModal(comment)}
            />
          ))}
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={false} visible={showModal}>
        <CommentInput
          data={currentComment}
          commentValue={commentValue}
          onChangeComment={text => onChangeComment(text)}
          closeModal={closeModal}
          openModal={openModal}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

Comments.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <StyledHeaderButton onPress={navigation.getParam('openModal')}>
      <Text>Post New Comment</Text>
    </StyledHeaderButton>
  )
});

const StyledHeaderButton = styled.TouchableOpacity`
  margin-right: 20px;
`;

export default Comments;
