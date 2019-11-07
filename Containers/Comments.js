import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  Modal,
  Picker
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { AppStyles } from '../Themes';
import CommentList from '../Components/Comment/CommentList';
import CommentInput from '../Components/Comment/CommentInput';
import DropDown from '../Components/DropDown';

const Comments = props => {
  const { id, contentType } = props.navigation.state.params;

  const { garments } = useSelector(state => ({
    garments: state.garments.items
  }));

  const { comments } = garments.find(garment => garment.id === id);

  const [searchValue, onChangeSearch] = useState('');
  const [commentValue, onChangeComment] = useState('');
  const [showModal, setModal] = useState(false);
  const [currentComment, setCurrentComment] = useState({});
  const [searchedComments, setSearchedComments] = useState(comments);
  const [tag, setTag] = useState('');
  const [showFilters, setShowFilter] = useState(false);

  useEffect(() => {
    props.navigation.setParams({
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

  const handleSubmit = searchValue => {};

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
      <ScrollView style={{ flex: 1 }}>
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

          <StyledFilterBarContainer>
            <StyledFilterBar>
              <DropDown
                options={['MOST RECENT', 'MOST POPULAR']}
                defaultValue="SELECT"
              />
            </StyledFilterBar>

            <VerticalDivider />

            <StyledFilterBar>
              <StyledFilterButton onPress={() => setShowFilter(!showFilters)}>
                <StyledFilterText>FILTER</StyledFilterText>
              </StyledFilterButton>
            </StyledFilterBar>
          </StyledFilterBarContainer>

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

        <CommentList
          {...props}
          data={searchedComments}
          renderViewComments
          renderLeaveComment
          numReplies={1}
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
          objectId={id}
        />
      </Modal>

      {showFilters && (
        <StyledPickerContainer>
          <StyledPickerHeader>
            <StyledPickerDone onPress={() => setShowFilter(false)}>
              Done
            </StyledPickerDone>
          </StyledPickerHeader>
          <StyledPicker
            selectedValue={tag}
            onValueChange={(itemValue, itemIndex) => setTag(itemValue)}
            itemStyle={{ color: '#fff' }}
          >
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Care" value="care" />
            <Picker.Item label="Styling" value="styling" />
            <Picker.Item label="Sizing" value="sizing" />
            <Picker.Item label="Other" value="other" />
          </StyledPicker>
        </StyledPickerContainer>
      )}
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
const StyledFilterBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;
const StyledFilterBar = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StyledFilterButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`;
const StyledFilterText = styled.Text`
  text-align: center;
`;
const VerticalDivider = styled.View`
  border-left-width: 1;
  align-self: stretch;
`;

const StyledPickerContainer = styled.View`
  flex: 1;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`;
const StyledPickerHeader = styled.View`
  justify-content: center;
  align-items: flex-end;
  padding: 20px 20px 0 20px;
`;
const StyledPickerDone = styled.Text`
  color: #fff;
`;
const StyledPicker = styled.Picker``;

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
