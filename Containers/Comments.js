import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  Modal
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { AppStyles } from '../Themes';
import CommentSingle from '../Components/Comment/CommentSingle';
import CommentInput from '../Components/Comment/CommentInput';

const Comments = ({ navigation }) => {
  const { currentGarment, contentType } = navigation.state.params;

  const { garments } = useSelector(state => ({
    garments: state.garments.items
  }));

  const { comments } = garments.find(
    garment => garment.id === currentGarment.id
  );

  const [searchValue, onChangeSearch] = useState('');
  const [commentValue, onChangeComment] = useState('');
  const [showModal, setModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});
  const [searchedComments, setSearchedComments] = useState(comments);

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

  // const handleSubmit = searchValue => {
  // };

  const searchComments = searchValue => {
    onChangeSearch(searchValue);

    const searchedComments = comments.filter(result =>
      searchValue.length > 0
        ? result.content.toLowerCase().includes(searchValue)
        : comments
    );

    setSearchedComments(searchedComments);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView>
        <View>
          <SearchBar
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.inputContainer}
            cancelButtonProps={{ color: '#000' }}
            round
            lightTheme
            placeholder="Search a question"
            onChangeText={searchComments}
            autoCapitalize="none"
            platform="ios"
            value={searchValue}
          />

          <View style={AppStyles.section}>
            <View style={AppStyles.sectionTitle}>
              <Text style={AppStyles.sectionTitleText}>Discussion</Text>
              <Text>
                {`Showing 1-${
                  searchedComments.length < 10 ? searchedComments.length : 10
                } of ${searchedComments.length} comments`}
              </Text>
            </View>
          </View>
        </View>

        <View>
          {searchedComments.map(comment => (
            <CommentSingle
              key={comment.content}
              data={comment}
              renderViewComments
              renderLeaveComment
              // TODO: request to replies
              viewComments={() =>
                navigation.navigate('CommentIndex', { comment, contentType })
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
          contentType={contentType}
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

const styles = {
  searchBarContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10
  },
  inputContainer: {
    backgroundColor: '#f3f3f3'
  }
};

export default Comments;
