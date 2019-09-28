import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchComments } from '../Redux/CommentsRedux';
import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity
} from 'react-native';
import { Input } from 'react-native-elements';
import { AppStyles, Metrics } from '../Themes';
import { Formik, ErrorMessage } from 'formik';
import CommentSingle from '../Components/CommentSingle';
import CommentInput from '../Components/CommentInput';
import { Ionicons } from '@expo/vector-icons';

const Comments = ({ navigation }) => {
  const [searchValue, onChangeSearch] = useState('');
  const [commentValue, onChangeComment] = useState('');
  const [showModal, setModal] = useState(false);

  // const { comments, loading, error } = useSelector(
  //   state => ({
  //     comments: state.comments.items,
  //     loading: state.comments.loading,
  //     error: state.comments.error
  //   }),
  //   shallowEqual
  // );
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchComments());
  // }, []);

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
              <Text>Showing 1-10 of 987 comments</Text>
            </View>
          </View>
        </View>

        <View>
          <CommentSingle hasReply leaveComment={openModal} />
          <CommentSingle leaveComment={openModal} />
          <CommentSingle leaveComment={openModal} />
          <CommentSingle hasReply leaveComment={openModal} />
        </View>
      </ScrollView>

      <StyledInputToggle>
        <Input
          placeholder="Add a comment"
          keyboardType="twitter" // keyboard with no return button
          autoFocus={false}
          onFocus={openModal}
          value={commentValue}
          onChangeText={text => onChangeComment(text)}
          onSubmitEditing={handleSubmit}
        />
      </StyledInputToggle>

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

Comments.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <TouchableOpacity
      style={{
        marginRight: 20
      }}
      onPress={navigation.getParam('openModal')}
    >
      <Ionicons name="ios-create" size={30} color="#000" />
    </TouchableOpacity>
  )
});

const StyledInputToggle = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
`;

export default Comments;
