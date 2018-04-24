import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Metrics } from '../Themes';

import { profiles } from '../data.json';

class GarmentsGrid extends Component {
  renderGarment(item) {
    const { navigate } = this.props.navigation;
    const { numCol, grid } = this.props;
    const { color, model, sku, brand, image } = item;
    return numCol == 2 ? (
      <TouchableOpacity
        style={styles.gridItem}
        key={sku}
        onPress={() => navigate('GarmentDetail', item)}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <Text>{model}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.gridItem}
        key={sku}
        onPress={() => navigate('GarmentDetail', item)}
      >
        <View
          style={[styles.imageContainer, { width: Metrics.screenWidth / 3 }]}
        >
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { data, numColumns } = this.props;
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.key}
        numColumns={3}
        renderItem={({ item }) => this.renderGarment(item)}
        scrollEnabled={false}
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
