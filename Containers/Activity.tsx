import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Metrics } from '../Themes';
import { View, Image, FlatList, ActivityIndicator } from 'react-native';
import { ActivityProps, useTypedSelector } from '../types';
import { useDispatch } from 'react-redux';
import { fetchActivity } from '../Redux/ActivityRedux';

const Activity: React.FC<ActivityProps> = ({ route, navigation }) => {
  // Redux state
  const { profileId } = useTypedSelector((state) => state.user);
  const { items: results, loading } = useTypedSelector((state) => state.activity);

  // Effects
  const dispatch = useDispatch();
  useEffect(() => {
    profileId && dispatch(fetchActivity(profileId));
  }, []);

  const onRefresh = () => {
    profileId && dispatch(fetchActivity(profileId));
  };

  const handleLoadMore = () => {};

  /* Reply | Comment */
  const renderDiscussion = (item) => {
    const { created_date: createdDate, content, origin, object_id: objectId } = item;
    const isReply = 'replies' in item;

    if (!item) return null;

    // if not valid photo, add a stock image
    const photoUrl = 'https://cdn1.iconfinder.com/data/icons/fitness/500/T-shirt-512.png';
    const date = createdDate && new Date(createdDate);
    const excerpt = content && content.split(' ').slice(0, 15).join(' ');

    return (
      <ActivityContainer>
        <ActivityMessageContainer>
          <ActivityImage>
            <Image
              style={styles.image}
              source={{
                uri: photoUrl,
              }}
            />
          </ActivityImage>

          <ActivityMessage>
            <IsResponse>{isReply ? 'You commented:' : 'You replied:'}</IsResponse>

            <PostMessage>{excerpt}</PostMessage>
            <PostDate>
              {date.toDateString()} {date.toLocaleTimeString()}
            </PostDate>
          </ActivityMessage>
        </ActivityMessageContainer>

        <ActivityButtonContainer>
          <ActivityButton onPress={() => navigateToType(origin, objectId)}>
            <ActivityButtonText>View</ActivityButtonText>
          </ActivityButton>
        </ActivityButtonContainer>
      </ActivityContainer>
    );
  };

  const navigateToType = (origin, id) => {
    origin === 'garment'
      ? navigation.push('Garment Detail', {
          id,
        })
      : navigation.push('Fit Detail', {
          id,
        });

    navigation.navigate('Comments', {
      objectId: id,
      contentType: origin,
    });
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
        data={results}
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

const ActivityContainer = styled.View`
  border-top-width: 0.2px;
  flex-direction: row;
  padding: 10px;
`;

const ActivityImage = styled.View`
  margin-right: 20px;
`;

const ActivityMessageContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const ActivityMessage = styled.View`
  flex: 1;
  flex-direction: column;
`;

const IsResponse = styled.Text`
  font-weight: 300;
  font-size: 10px;
  margin-bottom: 4px;
`;

const PostMessage = styled.Text`
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 4px;
`;

const PostDate = styled.Text`
  color: #aaa;
  font-size: 12px;
`;

const ActivityButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ActivityButton = styled.TouchableOpacity`
  background-color: #000;
  padding: 8px 15px;
  border-radius: 5px;x
`;

const ActivityButtonText = styled.Text`
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
  loading: {},
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
