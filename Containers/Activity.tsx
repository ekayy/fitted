import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Metrics } from '../Themes';
import { View, Image, FlatList, ActivityIndicator } from 'react-native';
import { ActivityProps, useTypedSelector, Comment } from '../types';
import { useDispatch } from 'react-redux';
import { fetchActivity } from '../Redux/ActivityRedux';

const data = [
  {
    id: 40,
    model: 'How does it size?',
    date: '4',
  },
  {
    id: 41,
    model: 'kafiltafish',
    date: '45',
  },
];

const Activity: React.FC<ActivityProps> = () => {
  // Redux state
  const { profileId } = useTypedSelector((state) => state.user);
  const { comments, loading } = useTypedSelector((state) => state.activity);

  // Effects
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActivity(profileId));
  }, []);

  const onRefresh = () => {};

  const handleLoadMore = () => {};

  const renderDiscussion = (item: Comment) => {
    const { id, model, created_date: date } = item;

    // if not valid photo, add a stock image
    const photoUrl = 'https://cdn1.iconfinder.com/data/icons/fitness/500/T-shirt-512.png';

    return (
      <GarmentItemContainer>
        <GarmentItem key={id}>
          <GarmentItemImageContainer>
            <Image style={styles.image} source={{ uri: photoUrl }} />
          </GarmentItemImageContainer>
          <GarmentDiscussion>
            <IsResponse>Commented:</IsResponse>
            <GarmentDiscussionText>
              <PostMessage>{model}</PostMessage>
              <PostDate>{date}</PostDate>
            </GarmentDiscussionText>
          </GarmentDiscussion>
        </GarmentItem>
        <GarmentDiscussionButton>
          <ButtonText>View discussion</ButtonText>
        </GarmentDiscussionButton>
      </GarmentItemContainer>
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderDiscussion(item)}
        onRefresh={onRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        refreshing={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListFooterComponent={renderFooter}
      />
    </>
  );
};

const GarmentItemContainer = styled.View`
  border-top-width: 0.2px;
  display: flex;
  flex-direction: row;
`;

const GarmentItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 70%;
`;

const GarmentItemImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const GarmentDiscussion = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GarmentDiscussionText = styled.View`
  display: flex;
  flex-direction: row;
`;

const IsResponse = styled.Text`
  font-weight: 200;
  font-size: 10px;
`;

const PostMessage = styled.Text`
  font-weight: 800;
  font-size: 12px;
`;

const PostDate = styled.Text`
  padding-left: 5px;
  color: #aaa;
  font-size: 12px;
`;

const GarmentDiscussionButton = styled.TouchableOpacity`
  background-color: #000;
  width: 25%;
  margin: 15px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
`;

const styles = {
  imageContainer: {
    flex: 1,
    width: Metrics.screenWidth / 1,
    height: 200,
    position: 'relative',
  },
  image: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 2,
  },
};

// const StyledActivityBar = styled.View`
//   height: 12%;
//   background-color: #000;
//   display: flex;
//   flex-direction: row;
// `;

// const StyledDiscussionButton = styled.TouchableOpacity`
//   width: 50%;
//   background-color: #bbb;
// `;

// const StyledInspirationButton = styled.TouchableOpacity`
//   width: 50%;
//   background-color: #ccc;
// `;

export default Activity;
