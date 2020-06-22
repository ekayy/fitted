import React, { useState, useEffect, RefObject, createRef, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  Modal,
  Picker,
  FlatList,
  Platform,
  Keyboard,
  TextInput,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { AppStyles } from '../Themes';
import CommentList from '../Components/Comment/CommentList';
import CommentInput from '../Components/Comment/CommentInput';
import Dropdown from '../Components/Dropdown';
import {
  fetchComments,
  selectRecentComments,
  selectPopularComments,
  loadReplies,
} from '../Redux/CommentsRedux';
import { CommentsProps, useTypedSelector, Sort, Comment } from '../types';

const sortOptions: string[] = [Sort.RECENT, Sort.POPULAR];

const Comments: React.FC<CommentsProps> = ({ route, navigation }) => {
  // Navigation params
  const { objectId, contentType, comment } = route.params;

  // Redux state
  const { items: comments } = useTypedSelector((state) => state.comments);
  // const comments = useSelector((state) => selectRecentComments(state));
  // const commentsByMostPopular = useSelector((state) => selectPopularComments(state));

  // State
  const [searchValue, onChangeSearch] = useState('');
  const [searchedComments, setSearchedComments] = useState(comments);
  const [tag, setTag] = useState<string>('');
  const [showFilters, setShowFilter] = useState<boolean>(false);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [currentComment, setCurrentComment] = useState<Comment>({});

  // for focusing on next input
  const inputRef: RefObject<TextInput> = createRef<TextInput>();
  // for scrolling to corresponding comment or reply
  const flatListRef: RefObject<FlatList> = useRef<FlatList>();

  const dispatch = useDispatch();
  useEffect(() => {
    // update comment store on tab change if changed
    dispatch(fetchComments(objectId, contentType));
  }, []);

  useEffect(() => {
    leaveReply(comment, 0);
  }, [comment]);

  useEffect(() => {
    // if redux comments change, update component state
    setSearchedComments(comments);
  }, [comments]);

  const searchComments = (searchValue) => {
    onChangeSearch(searchValue);

    const searchedComments = comments.filter((result) =>
      searchValue.length > 0 ? result.content.toLowerCase().includes(searchValue) : comments,
    );

    setSearchedComments(searchedComments);
  };

  const loadMoreReplies = (comment) => {
    const { id: commentId } = comment;

    dispatch(loadReplies({ commentId }));
  };

  const leaveReply = (comment, index) => {
    setCurrentComment(comment);
    setIsReply(true);
    inputRef.current && inputRef.current.focus();
    flatListRef.current && flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const closeReply = () => {
    setIsReply(false);
    Keyboard.dismiss();
  };

  const filterComments = (index, value) => {
    switch (value) {
      case 'Most Recent':
        return console.tron.log('recent');
      case 'Most Popular':
        return console.tron.log('popular');
      default:
        return;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
            <Dropdown options={sortOptions} defaultValue={Sort.SELECT} onSelect={filterComments} />
          </StyledFilterBar>

          <VerticalDivider />

          <StyledFilterBar>
            <StyledFilterButton onPress={() => setShowFilter(!showFilters)}>
              <StyledFilterText>FILTER</StyledFilterText>
            </StyledFilterButton>
          </StyledFilterBar>
        </StyledFilterBarContainer>

        {/* <View style={AppStyles.section}>
            <View style={AppStyles.sectionTitle}>
              <Text style={AppStyles.sectionTitleText}>Discussion</Text>
              <Text>
             {`Showing 1-${searchedComments.length < 10 ? searchedComments.length : 10} of ${
                  searchedComments.length
                } comments`}
              </Text>
            </View>
          </View> */}

        <CommentList
          flatListRef={flatListRef}
          route={route}
          data={searchedComments}
          renderViewComments
          renderLeaveComment
          loadMoreReplies={loadMoreReplies}
          leaveReply={leaveReply}
        />
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <CommentInput
          route={route}
          inputRef={inputRef}
          isReply={isReply}
          closeReply={closeReply}
          currentComment={currentComment}
        />
      </KeyboardAvoidingView>

      {/* <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderComment(item)}
          onRefresh={() => {}}
          onEndReached={() => {}}
          onEndReachedThreshold={0}
          refreshing={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          // ListFooterComponent={this.renderFooter}
        /> */}

      {showFilters && (
        <StyledPickerContainer>
          <StyledPickerHeader>
            <StyledPickerDone onPress={() => setShowFilter(false)}>Done</StyledPickerDone>
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
    </View>
  );
};

// const StyledHeaderButton = styled.TouchableOpacity`
//   margin-right: 20px;
// `;
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
    paddingVertical: 10,
  },
  inputContainer: {
    backgroundColor: '#f3f3f3',
  },
};

export default Comments;
