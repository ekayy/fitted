import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';

import { profiles } from '../data.json';

class Favorites extends Component {
  renderFit(fit) {
    const { color, model, sku, brand, image } = fit;
    return (
      <TouchableOpacity key={sku}>
        <View style={styles.gridItem}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.key}
        numColumns={3}
        renderItem={({ item }) => this.renderFit(item)}
        scrollEnabled={false}
      />
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  gridItem: {
    flex: 1,
    width: Dimensions.get('window').width / 3,
    height: 200,
    backgroundColor: '#333'
  },
  image: {
    width: undefined,
    height: 200
  }
};

export default Favorites;
