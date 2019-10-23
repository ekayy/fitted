import React, { Component } from 'react';
import styled from 'styled-components';
import { Badge } from 'react-native-elements';
import { Metrics } from '../Themes';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  FlatList
} from 'react-native';

const data = [
  {
    id: 40,
    model: 'How does it size?',
    date: '4'
  },
  {
    id: 41,
    model: 'kafiltafish',
    date: '45'
  }
];

class Activity extends Component {
  renderDiscussion(item) {
    const { editingCloset, brands } = this.props;
    const { id, color, model, sku, brand, photo, date } = item;

    // if not valid photo, add a stock image
    // if (photo.length > 10) {
    //   photoUrl = photo;
    // } else {
    photoUrl =
      'https://cdn1.iconfinder.com/data/icons/fitness/500/T-shirt-512.png';
    // }

    return (
      <GarmentItemContainer>
        <GarmentItem key={id}>
          <GarmentItemImageContainer>
            <Image style={styles.image} source={{ uri: photoUrl }} />
            {editingCloset && (
              <Badge
                value="X"
                status="error"
                containerStyle={{ top: 0, right: 0, position: 'absolute' }}
                onPress={() => this.props.unfavoriteGarment(id)}
              />
            )}
            <GarmentDiscussion>
              <IsResponse>Responded to a discussion post:</IsResponse>
              <GarmentDiscussionText>
                <PostMessage>{model}</PostMessage>
                <PostDate>{date} hours ago</PostDate>
              </GarmentDiscussionText>
            </GarmentDiscussion>
          </GarmentItemImageContainer>
          <GarmentDiscussionButton />
        </GarmentItem>
      </GarmentItemContainer>
    );
  }

  renderFooter = () => {
    const { loading } = this.props;

    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <StyledActivityContainer>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderDiscussion(item)}
          onRefresh={() => this.props.onRefresh()}
          onEndReached={this.props.handleLoadMore}
          onEndReachedThreshold={0}
          refreshing={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          ListFooterComponent={this.renderFooter}
          style={{ flex: 1 }}
        />
        {/* <StyledActivityBar>
          <StyledDiscussionButton></StyledDiscussionButton>
          <StyledInspirationButton></StyledInspirationButton>
        </StyledActivityBar> */}
      </StyledActivityContainer>
    );
  }
}

const GarmentItemContainer = styled.View`
  border-top-width: 0.2px;
`;

const GarmentItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const GarmentItemImageContainer = styled.View`
  width: 70%;
  flex-direction: row;
  align-items: center;
`;

const GarmentDiscussion = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  width: 30%;
  min-height: 30px;
`;

const styles = {
  imageContainer: {
    flex: 1,
    width: Metrics.screenWidth / 1,
    height: 200,
    position: 'relative'
  },
  image: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 2
  }
};

const StyledActivityContainer = styled.ScrollView`
  /* flex: 1; */
  /* flex-direction: column; */
`;

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
