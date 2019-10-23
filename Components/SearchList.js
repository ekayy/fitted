import React, { Component } from 'react';
import styled from 'styled-components';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Badge } from 'react-native-elements';
import { Metrics } from '../Themes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { favoriteGarment } from '../Redux/UserRedux';
import { connect } from 'react-redux';

class SearchList extends Component {
  renderGarment(item) {
    const { navigate } = this.props.navigation;
    const {
      numCol,
      grid,
      editingCloset,
      unfavoriteGarment,
      brands
    } = this.props;
    const { id, color, model, sku, brand, photo } = item;

    const bookmark = this.props.favoriteGarments.some(
      garmentId => garmentId === id
    )
      ? 'bookmark'
      : 'bookmark-outline';

    const brandName = brands[brand - 1].name;

    let formattedModel = model
      .split(' ')
      .map(word => word.charAt(0) + word.toLowerCase().slice(1))
      .join(' ');

    // if not valid photo, add a stock image
    if (photo.length > 10) {
      photoUrl = photo;
    } else {
      photoUrl =
        'https://cdn1.iconfinder.com/data/icons/fitness/500/T-shirt-512.png';
    }

    return (
      <GarmentItemContainer>
        <GarmentItem key={id} onPress={() => navigate('GarmentDetail', item)}>
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
            <GarmentItemInfo>
              <Text>{model}</Text>
              <Text>{brandName}</Text>
              <Text>{color}</Text>
            </GarmentItemInfo>
          </GarmentItemImageContainer>
        </GarmentItem>
        <GarmentBookmark onPress={() => this.favoriteGarment(id)}>
          <MaterialCommunityIcons
            name={bookmark}
            size={32}
            color="rgb(74, 144, 226)"
          />
        </GarmentBookmark>
      </GarmentItemContainer>
    );
  }

  favoriteGarment = async garmentId => {
    await this.props.favoriteGarment(garmentId, this.props.user);
  };

  renderFooter = () => {
    const { loading } = this.props;

    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = () => {
    return this.props.handleLoadMore();
  };

  render() {
    const {
      style,
      data,
      numColumns,
      ListFooterComponent,
      refreshing
    } = this.props;

    return (
      <FlatList
        style={style}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => this.renderGarment(item)}
        onRefresh={() => this.props.onRefresh()}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        refreshing={refreshing}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const GarmentItemContainer = styled.View`
  border-top-width: 0.2px;
  width: 100%;
  flex-direction: row;
`;

const GarmentItem = styled.TouchableOpacity`
  width: 80%;
`;

const GarmentItemImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const GarmentItemInfo = styled.View`
  flex-direction: column;
  padding-left: 5px;
`;

const GarmentBookmark = styled.TouchableOpacity`
  width: 20%;
  justify-content: center;
  align-items: center;
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

const mapStateToProps = state => {
  return {
    favoriteGarments: state.user.favoriteGarments
  };
};

export default connect(
  mapStateToProps,
  { favoriteGarment }
)(SearchList);
