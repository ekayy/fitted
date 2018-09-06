import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Metrics } from '../Themes';

import { profiles } from '../data.json';

class GarmentsGrid extends Component {
  renderGarment(item) {
    const { navigate } = this.props.navigation;
    const { numCol, grid } = this.props;
    const { id, color, model, sku, brand, photo } = item;
    return numCol == 2 ? (
      <TouchableOpacity
        style={styles.gridItem}
        key={id}
        onPress={() => navigate('GarmentDetail', item)}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>
        <Text>{model}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.gridItem}
        key={id}
        onPress={() => navigate('GarmentDetail', item)}
      >
        <View
          style={[styles.imageContainer, { width: Metrics.screenWidth / 3 }]}
        >
          <Image style={styles.image} source={{ uri: photo }} />
        </View>
      </TouchableOpacity>
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

  handleLoadMore = () => {
    return this.props.handleLoadMore();
  };

  render() {
    const { data, numColumns, ListFooterComponent, fetching } = this.props;
    return (
      <FlatList
        style={{ flex: 1 }}
        data={data}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({ item }) => this.renderGarment(item)}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        refreshing={fetching}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

const styles = {
  gridItem: {
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    width: Metrics.screenWidth / 2,
    height: 200
  },
  image: {
    width: undefined,
    height: 200
  }
};

export default GarmentsGrid;
